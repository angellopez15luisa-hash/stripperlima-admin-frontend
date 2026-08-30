<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'

// Definimos las propiedades que recibirá el componente
const props = defineProps<{
  initialTitle: string
  initialSubtitle: string
  badgeText?: string // Ej. 'H'
  titleLabel?: string // Ej. 'TÍTULO PRINCIPAL'
  subtitleLabel?: string // Ej. 'SUBTÍTULO DE CABECERA'
}>()

// Evento para emitir los datos guardados hacia el componente padre
const emit = defineEmits<{
  (e: 'save', payload: { title: string; subtitle: string }): void
}>()

const isHeaderEditing = ref<boolean>(false)
const headerForm = ref({
  title: props.initialTitle,
  subtitle: props.initialSubtitle
})

const saveHeader = () => {
  isHeaderEditing.value = false
  emit('save', { title: headerForm.value.title, subtitle: headerForm.value.subtitle })

  Swal.fire({
    title: '¡Actualizado!',
    text: 'El encabezado se ha guardado correctamente.',
    icon: 'success',
    confirmButtonColor: '#059669',
    background: '#0f172a',
    color: '#f8fafc',
  })
}
</script>

<template>
  <div class="bg-white dark:bg-[#0b0f19] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6 transition-colors">
    <!-- Cabecera de la tarjeta -->
    <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
      <div class="flex items-center gap-3">
        <span class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-xs">
          {{ badgeText || 'H' }}
        </span>
        <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Encabezado de la Sección</h2>
      </div>
      <button
        @click="isHeaderEditing = !isHeaderEditing"
        type="button"
        class="px-3.5 py-1.5 text-xs font-semibold tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-[#121824] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/60 transition-all flex items-center gap-2 cursor-pointer"
      >
        <font-awesome-icon icon="pen-to-square" />
        {{ isHeaderEditing ? 'Bloquear Edición' : 'Habilitar Edición' }}
      </button>
    </div>

    <!-- Inputs del formulario -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
          {{ titleLabel || 'Título Principal' }}
        </label>
        <input
          type="text"
          v-model="headerForm.title"
          :disabled="!isHeaderEditing"
          :class="isHeaderEditing ? 'bg-white dark:bg-[#121824] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#121824] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed'"
          class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
        />
      </div>
      <div>
        <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">
          {{ subtitleLabel || 'Subtítulo de Cabecera' }}
        </label>
        <input
          type="text"
          v-model="headerForm.subtitle"
          :disabled="!isHeaderEditing"
          :class="isHeaderEditing ? 'bg-white dark:bg-[#121824] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#121824] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed'"
          class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
        />
      </div>
    </div>

    <!-- Botón Guardar -->
    <div class="flex justify-end pt-2">
      <button
        @click="saveHeader"
        type="button"
        class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm"
      >
        <font-awesome-icon icon="floppy-disk" /> Guardar Cambios
      </button>
    </div>
  </div>
</template>
