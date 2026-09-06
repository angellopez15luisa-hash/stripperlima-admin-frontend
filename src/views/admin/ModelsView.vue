<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref, watch, nextTick, computed } from 'vue'
import { toast } from 'vue3-toastify'
import HeaderTitlesSlot from '@/components/slots/HeaderTitlesSlot.vue'
import { configure, useForm } from 'vee-validate'
import FormTextHeader from '@/components/ui/shared/FormTextHeader.vue'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { GeneralSettingAction } from '@/business/actions'
import { generalSettingUpdateSchema } from '@/schemas/general-setting'
import { GeneralSettingValue } from '@/values'
import { toTypedSchema } from '@vee-validate/zod'
import type { CatalogGalleryModel } from '@/types/general-setting'
import FormCatalogGalleryModel from '@/components/ui/models/FormCatalogGalleryModel.vue'

// Configura las reglas globales de validación para que se disparen en blur, change e input
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
})

// Función auxiliar para saber si estamos en modo oscuro al momento de lanzar SweetAlert2
// const isCurrentDarkMode = () => {
//   return document.documentElement.classList.contains('dark')
// }
const formTextHeaderRef = ref<InstanceType<typeof FormTextHeader> | null>(null)

const queryClient = useQueryClient()
const isEditing = ref(false)

const { data: generalSetting } = useQuery({
  queryKey: ['general-settings'],
  queryFn: () => GeneralSettingAction.getData(),
  retry: false,
})

const { defineField, resetForm, errors, setValues, meta } = useForm({
  validationSchema: toTypedSchema(generalSettingUpdateSchema),
  initialValues: GeneralSettingValue.updateForm,
})

const [titleHeader] = defineField('titleHeaderModels')
// Define y vincula el campo individual de la descripción de la cabecera usando VeeValidate
const [descriptionHeader] = defineField('descriptionHeaderModels')
// Variable reactiva local que almacena la lista actual de los servicios de la galería
const catalogGalleryList = ref<CatalogGalleryModel[]>([])
const originalCatalogBackup = ref<CatalogGalleryModel[]>([])

const searchQuery = ref<string>('')
const selectedCategory = ref<string>('Todos')
const currentPage = ref<number>(1)

const { mutate, isPending } = useMutation({
  // Define la función de acción que se ejecutará al mutar los datos
  mutationFn: GeneralSettingAction.update,
  // Callback que se ejecuta cuando la petición se completa con éxito
  onSuccess: (data, variables) => {
    // Extrae los valores actualizados desde las variables enviadas
    const newValues = variables.data
    // Actualiza de forma optimista la caché local de Vue Query
    queryClient.setQueryData(['general-settings'], (oldData: any) => {
      return {
        ...oldData,
        titleHeaderModels: newValues.titleHeaderModels,
        descriptionHeaderModels: newValues.descriptionHeaderModels,
        catalogGalleryModels: newValues.catalogGalleryModels,
      }
    })
    // Resetea el formulario de VeeValidate con los nuevos valores consolidados
    resetForm({ values: newValues })
    // Invalida la query para forzar una recarga limpia desde el servidor
    queryClient.invalidateQueries({ queryKey: ['general-settings'] })
    // Muestra una notificación flotante de éxito
    toast.success(data.message)
    // Desactiva el modo edición al guardar correctamente
    isEditing.value = false
  },
  // Callback que se ejecuta si ocurre un error durante la mutación
  onError: (error: any) => {
    // Muestra una notificación flotante con el mensaje de error
    toast.error(error.message)
  },
})

const toggleEdit = async () => {
  // Invierte el estado actual del modo edición
  isEditing.value = !isEditing.value

  // Evalúa si se activó el modo edición
  if (isEditing.value) {
    originalCatalogBackup.value = JSON.parse(JSON.stringify(catalogGalleryList.value))

    // Si existen datos previos en el servidor, resetea el formulario forzando los valores actuales
    if (generalSetting.value) {
      resetForm(
        {
          values: {
            titleHeaderModels: generalSetting.value.titleHeaderModels || '',
            descriptionHeaderModels: generalSetting.value.descriptionHeaderModels || '',
            catalogGalleryModels: generalSetting.value.catalogGalleryModels || [],
          },
        },
        { force: true },
      )
    }
    // Espera a que el DOM se renderice por completo y posiciona el foco en el título
    await nextTick()
    formTextHeaderRef.value?.focusTitle()
  } else {
    // Reemplazamos la lista visual con la copia de respaldo exacta
    catalogGalleryList.value = JSON.parse(JSON.stringify(originalCatalogBackup.value))
    // Reseteas el formulario si lo necesitas
    if (generalSetting.value) {
      resetForm(
        {
          values: { ...generalSetting.value },
        },
        { force: true },
      )
    }

    toast.info('Edición cancelada, cambios descartados.')
  }
}

watch(
  generalSetting,
  (newData) => {
    // Si existen nuevos datos, actualiza los campos y la lista local
    if (newData) {
      setValues({
        titleHeaderModels: newData.titleHeaderModels,
        descriptionHeaderModels: newData.descriptionHeaderModels,
      })
      // Parsea o asigna directamente la lista de servicios de la galería según su formato
      catalogGalleryList.value =
        typeof newData.catalogGalleryModels === 'string'
          ? JSON.parse(newData.catalogGalleryModels)
          : newData.catalogGalleryModels || []
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

// Asegúrate de tener estas funciones definidas en tu <script setup>
const handleGlobalCreate = (newModel: CatalogGalleryModel) => {
  queryClient.setQueryData(['general-settings'], (oldData: any) => {
    if (!oldData) return oldData
    return {
      ...oldData,
      catalogGalleryModels: [newModel, ...(oldData.catalogGalleryModels || [])],
    }
  })
}

function handleGlobalUpdate(id: CatalogGalleryModel['id'], updatedModel: CatalogGalleryModel) {
  // tu lógica aquí
  queryClient.setQueryData(['general-settings'], (oldData: any) => {
    if (!oldData) return oldData
    return {
      ...oldData,
      catalogGalleryModels: oldData.catalogGalleryModels.map((model: CatalogGalleryModel) =>
        model.id === id ? updatedModel : model,
      ),
    }
  })
}

function handleGlobalDelete(id: CatalogGalleryModel['id']) {
  queryClient.setQueryData(['general-settings'], (oldData: any) => {
    if (!oldData) return oldData
    return {
      ...oldData,
      catalogGalleryModels: oldData.catalogGalleryModels.filter(
        (model: CatalogGalleryModel) => model.id !== id,
      ),
    }
  })
}

const onSubmit = () => {
  // Si no está habilitado el modo edición, detiene la ejecución inmediatamente
  if (!isEditing.value) return

  // Dispara la mutación hacia el servidor con la estructura requerida
  mutate({
    id: generalSetting.value?.id,
    data: {
      titleHeaderModels: titleHeader.value,
      descriptionHeaderModels: descriptionHeader.value,
      catalogGalleryModels: catalogGalleryList.value,
    },
  })
}

const disabled = computed(() => !meta.value.valid || isPending.value || !isEditing.value)
</script>

<template>
  <div class="w-full p-6 space-y-6">
    <!-- CABECERA Y SECCIÓN 1: Mantenimiento de Textos -->
    <HeaderTitlesSlot>
      <template #title>Mantenimiento de Sección Modelos</template>
      <template #description
        >Personaliza el título principal, descripción y gestiona el catálogo de modelos del sitio
        web.</template
      >
      <template #button>
        <button
          @click="toggleEdit"
          :class="[
            'px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200 flex items-center gap-2 border shadow-sm cursor-pointer',
            isEditing
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-100 dark:border-slate-700 dark:hover:bg-slate-700',
          ]"
        >
          <!-- Cambiamos el icono según el estado -->
          <font-awesome-icon :icon="isEditing ? 'lock' : 'pen-to-square'" />
          <!-- Cambiamos el texto dinámicamente -->
          {{ isEditing ? 'Bloquear Edición' : 'Habilitar Edición' }}
        </button>
      </template>
    </HeaderTitlesSlot>

    <form class="space-y-6" @submit.prevent="onSubmit">
      <FormTextHeader
        ref="formTextHeaderRef"
        v-model:title="titleHeader"
        v-model:description="descriptionHeader"
        title-field-name="titleHeaderModels"
        desc-field-name="descriptionHeaderModels"
        :errors="errors"
        :disabled="!isEditing"
      />
      <FormCatalogGalleryModel
        :models="catalogGalleryList"
        @create="handleGlobalCreate"
        @update="handleGlobalUpdate"
        @delete="handleGlobalDelete"
        :isEditing="isEditing"
        @move="
          (fromIndex, toIndex) => {
            const newArr = [...catalogGalleryList]
            const [movedItem] = newArr.splice(fromIndex, 1)
            if (movedItem) {
              newArr.splice(toIndex, 0, movedItem)
            }
            catalogGalleryList = newArr
          }
        "
      />
      <div class="flex justify-end w-full pt-0">
        <button
          type="submit"
          class="w-full md:w-auto px-5 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm flex items-center justify-center gap-2"
          :disabled="disabled"
        >
          <!-- Icono dinámico de disquete o candado según el estado de carga y edición -->
          <font-awesome-icon v-if="!isPending" :icon="isEditing ? 'floppy-disk' : 'lock'" />
          <!-- Spinner animado de carga que se muestra mientras la mutación (isPending) está activa -->
          <svg v-else class="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24" fill="none">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <!-- Texto dinámico del botón según el estado de carga o edición -->
          <span>{{
            isPending
              ? 'Guardando...'
              : isEditing
                ? 'Guardar Cambios de Servicios'
                : 'Guardar Cambios'
          }}</span>
        </button>
      </div>
    </form>
  </div>
</template>
