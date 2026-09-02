<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { configure, useFieldArray, useForm } from 'vee-validate'
import { generalSettingUpdateSchema } from '@/schemas/general-setting'
import { GeneralSetting } from '@/values'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { GeneralSettingAction } from '@/business/actions'
import FormSocialLinks from '@/components/ui/start/FormSocialLinks.vue'
import FormTextsBanner from '@/components/ui/start/FormTextsBanner.vue'
import { toTypedSchema } from '@vee-validate/zod'
import ListImageBanners from '@/components/ui/start/ListImageBanners.vue'
import { toast } from 'vue3-toastify'

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
})

const formSocialLinksRef = ref<any>(null)
const queryClient = useQueryClient()

// Estado para controlar si la sección está en modo edición o bloqueada
const isEditing = ref(false)

const { data: generalSetting } = useQuery({
  queryKey: ['general-settings'],
  queryFn: () => GeneralSettingAction.getData(),
  retry: false,
})

const { defineField, resetForm, errors, handleSubmit, meta, validate } = useForm({
  validationSchema: toTypedSchema(generalSettingUpdateSchema),
  initialValues: GeneralSetting.updateForm,
})

const [titleStart] = defineField('titleStart')
const [descriptionStart] = defineField('descriptionStart')
const { fields: socialFields } = useFieldArray('socialLinks')
const { fields: bannerFields, move: moveBanner } = useFieldArray('banners')

const { mutate, isPending } = useMutation({
  mutationFn: GeneralSettingAction.update,
  onSuccess: (data) => {
    resetForm()
    queryClient.invalidateQueries({ queryKey: ['general-settings'] })
    toast.success(data.message)
    isEditing.value = false // Cerramos el modo edición al guardar con éxito
    setTimeout(() => {
      formSocialLinksRef.value?.focusFirstInput()
    }, 600)
  },
  onError: (error) => {
    toast.error(error.message)
  },
})

watch(generalSetting, (newData) => {
  if (newData) {
    resetForm(
      {
        values: { ...newData },
      },
      { force: true },
    )
  }
}, {

  deep:true,
  immediate:true
})

watch(
  () => bannerFields.value,
  () => {
    validate()
  },
  { deep: true },
)

onMounted(() => {
  setTimeout(() => {
    formSocialLinksRef.value?.focusFirstInput()
  }, 600)
})
// Función para alternar el modo edición con reseteo al cancelar
const toggleEditing = () => {
  if (isEditing.value) {
    // Si estaba editando y decide cancelar, restauramos la data original del servidor
    if (generalSetting.value) {
      resetForm(
        {
          values: { ...generalSetting.value },
        },
        { force: true },
      )
      toast.info('Edición cancelada, cambios descartados.')
    }
  }
  isEditing.value = !isEditing.value
}

// El botón se deshabilita si no es válido, si no está en modo edición, o si está guardando
const disabled = computed(() => !meta.value.valid || isPending.value || !isEditing.value)

const onSubmit = handleSubmit((values) => {
  const { id, ...data } = values

  mutate({ id, data })
})
</script>

<template>
  <div class="w-full p-6 space-y-6">
    <!-- Encabezado de la Sección con el Botón Habilitar Edición -->
    <div class="flex items-center justify-between">
      <div class="flex flex-col gap-1">
        <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Mantenimiento de Sección Inicio
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">
          Gestiona los textos globales, enlaces y el listado interactivo de imágenes para los
          banners.
        </p>
      </div>

      <!-- Botón de Habilitar / Cancelar Edición -->
      <button
        type="button"
        @click="toggleEditing"
        class="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl border transition-colors cursor-pointer bg-white text-slate-700 border-slate-300 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700"
      >
        <font-awesome-icon :icon="isEditing ? 'xmark' : 'pen-to-square'" />
        <span>{{ isEditing ? 'Cancelar Edición' : 'Habilitar Edición' }}</span>
      </button>
    </div>

    <!-- Formulario Principal -->
    <form class="space-y-6" @submit.prevent="onSubmit">
      <!-- REDES SOCIALES -->
      <FormSocialLinks
        :socialFields="socialFields"
        :disabled="!isEditing"
        ref="formSocialLinksRef"
      />

      <!-- TEXTOS DE BANNER -->
      <FormTextsBanner
        v-model:title="titleStart"
        v-model:description="descriptionStart"
        :errors="errors"
        :disabled="!isEditing"
      />

      <!-- SECCIÓN DE BANNERS -->
      <div class="relative w-full">
        <ListImageBanners
          :banners="bannerFields"
          :disabled="!isEditing"
          @move="({ from, to }) => moveBanner(from, to)"
        />
        <div
          v-if="errors.banners"
          class="mt-4 z-10 flex items-center gap-2.5 text-rose-500 text-xs font-semibold bg-rose-500/10 border border-rose-500/20 px-4 py-2.5 rounded-xl backdrop-blur-md shadow-sm animate-fade-in"
        >
          <span>⚠️ {{ errors.banners }}</span>
        </div>
      </div>

      <!-- BOTÓN DE GUARDAR (Siempre visible abajo a la derecha, estilo referencia) -->
      <div class="flex justify-end w-full pt-0">
        <button
          type="submit"
          class="px-5 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
          :disabled="disabled"
        >
          <font-awesome-icon v-if="!isPending" :icon="isEditing ? 'floppy-disk' : 'lock'" />
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
          <span>{{
            isPending ? 'Guardando...' : isEditing ? 'Guardar Cambios de Inicio' : 'Guardar Cambios'
          }}</span>
        </button>
      </div>
    </form>
  </div>
</template>
