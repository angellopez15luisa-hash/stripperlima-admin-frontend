<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
// Importa las funciones y hooks esenciales de Vue
import { computed, nextTick, ref, watch } from 'vue'
// Importa el componente hijo encargado de mostrar y editar la cabecera con textos
import FormTextHeader from '@/components/ui/shared/FormTextHeader.vue'
// Importa el componente hijo encargado de listar y gestionar el catálogo de servicios en la galería
import CatalogGalleryService from '@/components/ui/services/CatalogGalleryService.vue'
// Importa funciones de validación y configuración de formularios desde vee-validate
import { configure, useForm } from 'vee-validate'
// Importa hooks de TanStack Vue Query para manejar peticiones HTTP, mutaciones y caché de datos
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
// Importa las acciones de negocio para interactuar con la API de configuraciones generales
import { GeneralSettingAction } from '@/business/actions'
// Importa el esquema de validación Zod para actualizar las configuraciones generales
import { generalSettingUpdateSchema } from '@/schemas/general-setting'
// Importa la función adaptadora para convertir esquemas Zod en esquemas válidos para VeeValidate
import { toTypedSchema } from '@vee-validate/zod'
// Importa los valores por defecto para el formulario de configuraciones generales
import { GeneralSettingValue } from '@/values'
// Importa la librería vue3-toastify para mostrar notificaciones flotantes de éxito o error
import { toast } from 'vue3-toastify'
// Importa la definición de tipos para los servicios del catálogo de la galería
import type { CatalogGalleryServiceT } from '@/types/general-setting'

// Configura las reglas globales de validación para que se disparen en blur, change e input
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
})

// Crea una referencia para manipular directamente el componente hijo de la cabecera (ej. hacer focus)
const formTextHeaderRef = ref<InstanceType<typeof FormTextHeader> | null>(null)
// Inicializa la instancia del cliente de Vue Query para gestionar la caché global
const queryClient = useQueryClient()

// Estado global de edición para toda la vista (controla si se pueden modificar los campos o no)
const isEditing = ref<boolean>(false)

// Configura una consulta (query) para obtener los datos iniciales de las configuraciones generales desde el servidor
const { data: generalSetting } = useQuery({
  queryKey: ['general-settings'],
  queryFn: () => GeneralSettingAction.getData(),
  retry: false,
})

// Inicializa el hook useForm de VeeValidate con el esquema de validación y valores por defecto
const { defineField, resetForm, errors, setValues } = useForm({
  validationSchema: toTypedSchema(generalSettingUpdateSchema),
  initialValues: GeneralSettingValue.updateForm,
})

// Define y vincula el campo individual del título de la cabecera usando VeeValidate
const [titleHeader] = defineField('titleHeaderServices')
// Define y vincula el campo individual de la descripción de la cabecera usando VeeValidate
const [descriptionHeader] = defineField('descriptionHeaderServices')
// Variable reactiva local que almacena la lista actual de los servicios de la galería
const catalogGalleryList = ref<CatalogGalleryServiceT[]>([])

// Configura una mutación (mutation) para enviar la actualización de los datos al servidor
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
        titleHeaderServices: newValues.titleHeaderServices,
        descriptionHeaderServices: newValues.descriptionHeaderServices,
        catalogGalleryServices: newValues.catalogGalleryServices,
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

// Función personalizada que maneja el envío directo de los datos al backend sin bloqueos de Zod
const onSubmit = () => {
  // Si no está habilitado el modo edición, detiene la ejecución inmediatamente
  if (!isEditing.value) return

  // Obtiene los valores actuales de los campos de la cabecera o asigna cadena vacía por defecto
  const currentTitle = titleHeader.value || ''
  const currentDesc = descriptionHeader.value || ''

  // Extrae el identificador único del registro general si existe
  const id = generalSetting.value?.id

  // Registra en consola el payload que se enviará directamente
  console.log('Enviando datos directos:', {
    titleHeaderServices: currentTitle,
    descriptionHeaderServices: currentDesc,
    catalogGalleryServices: catalogGalleryList.value,
  })

  // Dispara la mutación hacia el servidor con la estructura requerida
  mutate({
    id: id!,
    data: {
      titleHeaderServices: currentTitle,
      descriptionHeaderServices: currentDesc,
      catalogGalleryServices: catalogGalleryList.value,
    },
  })
}

// Observador (watch) que vigila la llegada o cambios en los datos de 'general-settings' para rellenar el formulario
watch(
  generalSetting,
  (newData) => {
    // Si existen nuevos datos, actualiza los campos y la lista local
    if (newData) {
      setValues({
        titleHeaderServices: newData.titleHeaderServices,
        descriptionHeaderServices: newData.descriptionHeaderServices,
      })
      // Parsea o asigna directamente la lista de servicios de la galería según su formato
      catalogGalleryList.value =
        typeof newData.catalogGalleryServices === 'string'
          ? JSON.parse(newData.catalogGalleryServices)
          : newData.catalogGalleryServices || []
    }
  },
  {
    deep: true,
    immediate: true,
  },
)

// Función asíncrona para alternar el estado del modo edición (bloquear/desbloquear) y manejar cancelaciones
const toggleEditing = async () => {
  // Invierte el estado actual del modo edición
  isEditing.value = !isEditing.value

  // Evalúa si se activó el modo edición
  if (isEditing.value) {
    // Si existen datos previos en el servidor, resetea el formulario forzando los valores actuales
    if (generalSetting.value) {
      resetForm(
        {
          values: {
            titleHeaderServices: generalSetting.value.titleHeaderServices || '',
            descriptionHeaderServices: generalSetting.value.descriptionHeaderServices || '',
            catalogGalleryServices: generalSetting.value.catalogGalleryServices || [],
          },
        },
        { force: true },
      )
    }
    // Espera a que el DOM se renderice por completo y posiciona el foco en el título
    await nextTick()
    formTextHeaderRef.value?.focusTitle()
  } else {
    // Si el usuario cancela la edición, restaura los datos originales obtenidos del servidor
    if (generalSetting.value) {
      resetForm(
        {
          values: { ...generalSetting.value },
        },
        { force: true },
      )
      // Restaura la lista original de servicios de la galería
      catalogGalleryList.value =
        typeof generalSetting.value.catalogGalleryServices === 'string'
          ? JSON.parse(generalSetting.value.catalogGalleryServices)
          : generalSetting.value.catalogGalleryServices || []
      // Notifica al usuario que se canceló la edición
      toast.info('Edición cancelada, cambios descartados.')
    }
  }
}

// Función inmutable para agregar un servicio nuevo a la lista local y a la caché
const handleGlobalCreate = (newService: CatalogGalleryServiceT) => {
  queryClient.setQueryData(['general-settings'], (oldData: any) => {
    if (!oldData) return oldData
    return {
      ...oldData,
      catalogGalleryServices: [newService, ...(oldData.catalogGalleryServices || [])],
    }
  })
}

// Función inmutable para actualizar un servicio existente dentro de la caché general
const handleGlobalUpdate = (id: number, updatedService: CatalogGalleryServiceT) => {
  queryClient.setQueryData(['general-settings'], (oldData: any) => {
    if (!oldData) return oldData
    return {
      ...oldData,
      catalogGalleryServices: oldData.catalogGalleryServices.map((service: any) =>
        service.id === id ? updatedService : service,
      ),
    }
  })
}

// Función inmutable para eliminar un servicio de la lista mediante su identificador
const handleGlobalDelete = (id: number) => {
  queryClient.setQueryData(['general-settings'], (oldData: any) => {
    if (!oldData) return oldData
    return {
      ...oldData,
      catalogGalleryServices: oldData.catalogGalleryServices.filter(
        (service: any) => service.id !== id,
      ),
    }
  })
}

// Propiedad computada optimizada que determina si el botón principal de guardar debe estar deshabilitado o no
const disabled = computed(() => {
  // 1. Si no estamos en modo edición o la mutación está en proceso, se deshabilita
  if (!isEditing.value || isPending.value) return true

  // 2. Si los campos obligatorios principales están vacíos, se deshabilita
  if (!titleHeader.value || !descriptionHeader.value) return true

  // 3. Caso contrario, el botón se mantiene totalmente habilitado y funcional
  return false
})
</script>

<template>
  <!-- Formulario principal que intercepta el evento submit para procesar los cambios de manera directa -->
  <form @submit.prevent="onSubmit" class="w-full p-6 space-y-6">
    <!-- Cabecera principal con el título de la vista y el botón para alternar el modo edición -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-5"
    >
      <!-- Contenedor de textos informativos de la sección -->
      <div class="space-y-1">
        <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-wide">
          Mantenimiento Sección: Servicios
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Personaliza los títulos principales, el contenido descriptivo y las imágenes de los
          servicios de la landing.
        </p>
      </div>

      <!-- Botón interactivo para Habilitar o Bloquear la Edición global -->
      <button
        type="button"
        @click="toggleEditing"
        :class="[
          'px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200 flex items-center gap-2 border shadow-sm cursor-pointer',
          isEditing
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
            : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600',
        ]"
      >
        <!-- Icono dinámico según el estado de edición -->
        <font-awesome-icon :icon="isEditing ? 'lock' : 'pen-to-square'" />
        <!-- Texto dinámico del botón de edición -->
        {{ isEditing ? 'Bloquear Edición' : 'Habilitar Edición' }}
      </button>
    </div>

    <!-- Componente hijo de la tarjeta de encabezado con los campos de título y descripción -->
    <FormTextHeader
      ref="formTextHeaderRef"
      v-model:title="titleHeader"
      v-model:description="descriptionHeader"
      :errors="errors"
      :disabled="!isEditing"
    />

    <!-- Componente hijo de gestión de servicios que renderiza el grid y maneja eventos CRUD y ordenamiento -->
    <CatalogGalleryService
      :services="catalogGalleryList"
      :disabled="!isEditing"
      @create="handleGlobalCreate"
      @update="handleGlobalUpdate"
      @delete="handleGlobalDelete"
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

    <!-- Contenedor del botón inferior para guardar los cambios globales realizados -->
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
</template>
