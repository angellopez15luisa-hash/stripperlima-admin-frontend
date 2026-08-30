<script setup lang="ts">
import Swal from "sweetalert2"
import { ref } from 'vue'

// Estado reactivo para el formulario de Mantenimiento de Contacto
const contactContent = ref({
  sectionTitle: 'Contacto',
  sectionDescription: 'Estamos aquí para responder a todas tus preguntas y ayudarte a organizar el evento perfecto.',
  address: 'Pasaje buena Ventura 155 breña Lima - Perú',
  phone: '+51 929 720 720',
  email: 'info@stripperlima101.pe',
  schedule: 'Lunes a Viernes: 10:00 - 20:00\nSábados: 11:00 - 15:00'
})

// Estado para la tarjeta 1: Encabezado (Corregido a la sección Contacto)
const isHeaderEditing = ref<boolean>(false)
const headerForm = ref({
  title: 'Contáctanos y Haz Realidad tu Evento',
  subtitle: 'Ponte en comunicación con nosotros para reservas, cotizaciones y resolver todas tus dudas.'
})

const saveHeader = () => {
  isHeaderEditing.value = false
  Swal.fire({
    title: '¡Actualizado!',
    text: 'El encabezado se ha guardado correctamente.',
    icon: 'success',
    confirmButtonColor: '#059669',
    background: '#0f172a',
    color: '#f8fafc',
  })
}

// Estado para la tarjeta 2: Información de Contacto
const isEditingInfo = ref<boolean>(false)

const saveInfoChanges = () => {
  isEditingInfo.value = false
  Swal.fire({
    title: '¡Actualizado!',
    text: 'La información de contacto se ha guardado correctamente.',
    icon: 'success',
    confirmButtonColor: '#059669',
    background: '#0f172a',
    color: '#f8fafc',
  })
}
</script>

<template>
  <div class="p-8 space-y-8 bg-slate-50 dark:bg-[#0b0f19] min-h-screen text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

    <!-- CABECERA: Título de la Vista -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">Mantenimiento Sección: Contacto</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">Administra los textos principales y la información de contacto visible en la landing page.</p>
    </div>

    <!-- TARJETA 1: Encabezado de la Sección -->
    <div class="bg-white dark:bg-[#0b0f19] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6 transition-colors">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-xs">H</span>
          <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Encabezado de la Sección</h2>
        </div>
        <button
          @click="isHeaderEditing = !isHeaderEditing"
          type="button"
          class="px-3.5 py-1.5 text-xs font-semibold tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-[#121824] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/60 transition-all flex items-center gap-2 cursor-pointer"
        >
          <font-awesome-icon :icon="isHeaderEditing ? 'xmark' : 'pen-to-square'" />
          {{ isHeaderEditing ? 'Cancelar' : 'Habilitar Edición' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Título Principal</label>
          <input
            type="text"
            v-model="headerForm.title"
            :disabled="!isHeaderEditing"
            :class="isHeaderEditing ? 'bg-white dark:bg-[#121824] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#121824] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed'"
            class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Subtítulo de Cabecera</label>
          <input
            type="text"
            v-model="headerForm.subtitle"
            :disabled="!isHeaderEditing"
            :class="isHeaderEditing ? 'bg-white dark:bg-[#121824] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#121824] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed'"
            class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
          />
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button
          @click="saveHeader"
          type="button"
          :disabled="!isHeaderEditing"
          :class="isHeaderEditing ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60'"
          class="px-5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
        >
          <font-awesome-icon icon="floppy-disk" /> Guardar Cambios
        </button>
      </div>
    </div>

    <!-- TARJETA 2: Información de Contacto -->
    <div class="bg-white dark:bg-[#0b0f19] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-xl space-y-6">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/25 text-xs">I</span>
          <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Información de Contacto</h2>
        </div>
        <button
          @click="isEditingInfo = !isEditingInfo"
          type="button"
          class="px-3.5 py-1.5 text-xs font-semibold tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-[#121824] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/60 transition-all flex items-center gap-2 cursor-pointer"
        >
          <font-awesome-icon :icon="isEditingInfo ? 'xmark' : 'pen-to-square'" />
          {{ isEditingInfo ? 'Cancelar' : 'Habilitar Edición' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Dirección -->
        <div>
          <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <font-awesome-icon icon="location-dot" class="text-emerald-500 text-xs" /> Dirección
          </label>
          <textarea
            v-model="contactContent.address"
            rows="2"
            :disabled="!isEditingInfo"
            :class="isEditingInfo ? 'bg-white dark:bg-[#121824] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#121824] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed'"
            class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors resize-none"
          ></textarea>
        </div>

        <!-- Teléfono -->
        <div>
          <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <font-awesome-icon icon="phone" class="text-emerald-500 text-xs" /> Teléfono
          </label>
          <input
            type="text"
            v-model="contactContent.phone"
            :disabled="!isEditingInfo"
            :class="isEditingInfo ? 'bg-white dark:bg-[#121824] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#121824] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed'"
            class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <font-awesome-icon icon="envelope" class="text-emerald-500 text-xs" /> Email
          </label>
          <input
            type="email"
            v-model="contactContent.email"
            :disabled="!isEditingInfo"
            :class="isEditingInfo ? 'bg-white dark:bg-[#121824] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#121824] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed'"
            class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
          />
        </div>

        <!-- Horario de Atención -->
        <div>
          <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <font-awesome-icon icon="clock" class="text-emerald-500 text-xs" /> Horario de Atención (Soporta saltos de línea)
          </label>
          <textarea
            v-model="contactContent.schedule"
            rows="3"
            :disabled="!isEditingInfo"
            placeholder="Ej. Lunes a Viernes: 10:00 - 20:00&#10;Sábados: 11:00 - 15:00"
            :class="isEditingInfo ? 'bg-white dark:bg-[#121824] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500 font-mono' : 'bg-slate-100 dark:bg-[#121824] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed font-mono'"
            class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors resize-none"
          ></textarea>
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button
          @click="saveInfoChanges"
          type="button"
          :disabled="!isEditingInfo"
          :class="isEditingInfo ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-sm' : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-60'"
          class="px-5 py-2 text-xs font-semibold rounded-xl transition-all flex items-center gap-2"
        >
          <font-awesome-icon icon="floppy-disk" /> Guardar Cambios
        </button>
      </div>
    </div>

  </div>
</template>
