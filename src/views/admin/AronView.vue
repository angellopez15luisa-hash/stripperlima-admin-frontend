<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import Swal from 'sweetalert2'

// Importar el editor Quill para Vue 3 y sus estilos
// import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import FormTextHeaderAron from '@/components/ui/aron/FormTextHeaderAron.vue'
import FormTextEditorAron from '@/components/ui/aron/FormTextEditorAron.vue'
import GaleryImagesAron from '@/components/ui/aron/GaleryImagesAron.vue'
import { configure, useFieldArray, useForm } from 'vee-validate'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { GeneralSettingAction } from '@/business/actions'
import { generalSettingUpdateSchema } from '@/schemas/general-setting'
import { GeneralSetting } from '@/values'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue3-toastify'

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
})

const formTextHeaderRef = ref<InstanceType<typeof FormTextHeaderAron> | null>(null)
const queryClient = useQueryClient()
// Estado para controlar la edición global (Bloqueado por defecto)
const isEditing = ref(false)

const { data: generalSetting } = useQuery({
  queryKey: ['general-settings'],
  queryFn: () => GeneralSettingAction.getData(),
  retry: false,
})

const { defineField, resetForm, errors, handleSubmit, meta } = useForm({
  validationSchema: toTypedSchema(generalSettingUpdateSchema),
  initialValues: GeneralSetting.updateForm,
})

const [titleAron] = defineField('titleAron')
const [subtitleAron] = defineField('subtitleAron')
const [titleEditorAron] = defineField('titleEditorAron')
const [descriptionEditorAron] = defineField('descriptionEditorAron')
const { fields: listLabelsFields } = useFieldArray('listLabelsEditorAron')
const [textHtmlAron] = defineField('textHtmlEditorAron')
const { fields: galeryImagesFields, move: moveGaleryImages } = useFieldArray('galeryImagesAron')

const { mutate, isPending } = useMutation({
  mutationFn: GeneralSettingAction.update,
  onSuccess: (data, variables) => {
    const newValues = variables.data
    queryClient.setQueryData(['general-settings'], (oldData: any) => {
      return {
        ...oldData,
        titleAron: newValues.titleAron,
        subtitleAron: newValues.subtitleAron,
        titleEditorAron: newValues.titleEditorAron,
        descriptionEditorAron: newValues.descriptionEditorAron,
        listLabelsEditorAron: newValues.listLabelsEditorAron,
        textHtmlEditorAron: newValues.textHtmlEditorAron,
        galeryImagesAron: newValues.galeryImagesAron,
      }
    })
    resetForm({ values: newValues })
    queryClient.invalidateQueries({ queryKey: ['general-settings'] })
    toast.success(data.message)
    isEditing.value = false // Cerramos el modo edición al guardar con éxito
  },
  onError: (error) => {
    toast.error(error.message)
  },
})
watch(
  generalSetting,
  (newData) => {
    if (newData) {
      resetForm(
        {
          values: { ...newData },
        },
        { force: true },
      )
    }
  },
  {
    deep: true,
    immediate: true,
  },
)
onMounted(() => {
  setTimeout(() => {
    formTextHeaderRef.value?.focusTitle()
  }, 600)
})
const toggleEdit = async () => {
  // 1. Primero cambiamos el estado
  isEditing.value = !isEditing.value

  // 2. Si ahora está en true (acabamos de habilitar la edición)
  if (isEditing.value) {
    await nextTick()
    formTextHeaderRef.value?.focusTitle()
  }
  // 3. Si ahora está en false (acabamos de cancelar la edición)
  else {
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
}
const onSubmit = handleSubmit((values) => {
  if (!isEditing.value) return

  const { id, ...data } = values
  mutate({ id, data })
})
const disabled = computed(() => !meta.value.valid || isPending.value || !isEditing.value)
</script>
<template>
  <div class="w-full p-6 space-y-6">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-slate-800 pb-5 gap-4"
    >
      <div>
        <h1 class="text-xl font-bold text-slate-900 dark:text-white">
          Mantenimiento Sección: Aron
        </h1>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Personaliza los textos principales, el contenido descriptivo y las 6 fotografías amplias
          de la sección.
        </p>
      </div>
      <!-- Botón Superior Habilitar Edición -->
      <button
        @click="toggleEdit"
        :class="[
          'px-4 py-2 text-xs font-medium rounded-xl transition-all duration-200 flex items-center gap-2 border shadow-sm cursor-pointer',
          isEditing
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 hover:bg-amber-500/20'
            : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600',
        ]"
      >
        <!-- Cambiamos el icono según el estado -->
        <font-awesome-icon :icon="isEditing ? 'lock' : 'pen-to-square'" />
        <!-- Cambiamos el texto dinámicamente -->
        {{ isEditing ? 'Bloquear Edición' : 'Habilitar Edición' }}
      </button>
    </div>
    <form @submit.prevent="onSubmit" class="space-y-6">
      <FormTextHeaderAron
        v-model:title="titleAron"
        v-model:subtitle="subtitleAron"
        :errors="errors"
        :disabled="!isEditing"
        ref="formTextHeaderRef"
      />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <FormTextEditorAron
          :disabled="!isEditing"
          v-model:title="titleEditorAron"
          v-model:description="descriptionEditorAron"
          v-model:textHtml="textHtmlAron"
          :listLabelsFields="listLabelsFields"
          :errors="errors"
        />
        <GaleryImagesAron
          :galeryImages="galeryImagesFields"
          @move="({ from, to }) => moveGaleryImages(from, to)"
          :disabled="!isEditing"
        />
      </div>
      <!-- Botón de Guardar Visible pero Deshabilitado si no está en modo edición -->
      <div class="flex justify-end w-full pt-0">
        <button
          type="submit"
          class="w-full md:w-auto px-5 py-2.5 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
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
            isPending
              ? 'Guardando...'
              : isEditing
                ? 'Guardar Cambios de Sección Aron'
                : 'Guardar Cambios'
          }}</span>
        </button>
      </div>
    </form>
  </div>
</template>
