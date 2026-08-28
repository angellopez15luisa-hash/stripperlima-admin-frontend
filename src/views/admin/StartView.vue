<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'

// Estado del formulario con los campos que pediste
const form = ref({
  title: 'Despedidas de Solteros Inolvidables',
  subtitle: 'Crea momentos únicos con nuestros servicios exclusivos para despedidas de soltero que nunca olvidarás.',
  bannerImage: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=1200',
  instagramHref: 'https://instagram.com/aroneventosperu',
  facebookHref: 'https://facebook.com/aroneventosperu',
  tiktokHref: 'https://tiktok.com/@el.indomable35',
})

// Archivo real seleccionado (listo para cuando lo mandes a Cloudinary)
const selectedFile = ref<File | null>(null)

// Función para manejar la selección de archivo y generar la previsualización local al instante
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    selectedFile.value = file

    // Creamos una URL local temporal para mostrar la previsualización de inmediato
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        form.value.bannerImage = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }
}

// Función simulada para guardar cambios
const handleSubmit = () => {
  // Aquí puedes enviar 'selectedFile.value' a Cloudinary o a tu API backend
  Swal.fire({
    title: '¡Actualizado!',
    text: 'Los cambios del banner de inicio se han guardado correctamente.',
    icon: 'success',
    confirmButtonColor: '#059669',
    background: '#0f172a',
    color: '#f8fafc',
  })
}

// Función para manejar cuando arrastran y sueltan una imagen
const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer && event.dataTransfer.files && event.dataTransfer.files[0]) {
    const file = event.dataTransfer.files[0]
    selectedFile.value = file

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        form.value.bannerImage = e.target.result as string
      }
    }
    reader.readAsDataURL(file)
  }
}
</script>

<template>
  <div class="p-6 max-w-5xl mx-auto space-y-6">
    <!-- Encabezado de la Sección -->
    <div class="flex flex-col gap-1">
      <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
        Mantenimiento de Sección Inicio
      </h1>
      <p class="text-xs text-slate-500 dark:text-slate-400">
        Gestiona el contenido principal del banner y los enlaces de redes sociales visibles en la landing page.
      </p>
    </div>

    <!-- Formulario Principal -->
    <form @submit.prevent="handleSubmit" class="space-y-6">

         <!-- TARJETA 3: Redes Sociales (Hrefs) -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <font-awesome-icon icon="share-nodes" class="text-emerald-500" />
          Enlaces de Redes Sociales (Header Superior)
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <!-- Instagram -->
          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <font-awesome-icon :icon="['fab', 'instagram']" class="text-pink-500" /> Instagram Href
            </label>
            <input
              v-model="form.instagramHref"
              type="text"
              class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              placeholder="https://instagram.com/..."
            />
          </div>

          <!-- Facebook -->
          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <font-awesome-icon :icon="['fab', 'facebook']" class="text-blue-500" /> Facebook Href
            </label>
            <input
              v-model="form.facebookHref"
              type="text"
              class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              placeholder="https://facebook.com/..."
            />
          </div>

          <!-- TikTok -->
          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1 flex items-center gap-1.5">
              <font-awesome-icon :icon="['fab', 'tiktok']" class="text-slate-900 dark:text-white" /> TikTok Href
            </label>
            <input
              v-model="form.tiktokHref"
              type="text"
              class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              placeholder="https://tiktok.com/@..."
            />
          </div>
        </div>
      </div>

      <!-- TARJETA 1: Textos Principales del Banner -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <font-awesome-icon icon="heading" class="text-emerald-500" />
          Textos del Banner
        </h2>

        <div class="space-y-3">
          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Título Principal
            </label>
            <input
              v-model="form.title"
              type="text"
              class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              placeholder="Ej. Despedidas de Solteros Inolvidables"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Descripción / Texto Largo
            </label>
            <textarea
              v-model="form.subtitle"
              rows="3"
              class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
              placeholder="Escribe la descripción que aparece sobre el banner..."
            ></textarea>
          </div>
        </div>
      </div>

    <!-- TARJETA 2: Imagen de Fondo del Banner (Alineado arriba con items-start) -->
      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <font-awesome-icon icon="image" class="text-emerald-500" />
          Imagen de Fondo del Banner
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

          <!-- Input File con soporte Drag & Drop real -->
          <div class="md:col-span-2 space-y-3">
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Subir Nueva Imagen de Banner
            </label>

            <label
              @dragover.prevent
              @drop.prevent="handleDrop"
              class="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl cursor-pointer bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <div class="flex flex-col items-center justify-center pt-3 pb-3 px-4 text-center pointer-events-none">
                <font-awesome-icon icon="cloud-arrow-up" class="text-emerald-500 text-xl mb-2" />
                <p class="text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <span class="text-emerald-600 dark:text-emerald-400">Haz clic para subir</span> o arrastra tu imagen aquí
                </p>
                <p class="text-[10px] text-slate-400 mt-1">PNG, JPG, WEBP (Recomendado 1920x1080px)</p>
              </div>
              <input type="file" class="hidden" accept="image/*" @change="handleFileChange" />
            </label>

            <!-- Nombre del archivo seleccionado -->
            <p v-if="selectedFile" class="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium truncate">
              Archivo seleccionado: {{ selectedFile.name }}
            </p>
          </div>

          <!-- Previsualización en tiempo real (Ahora perfectamente alineada arriba) -->
          <div class="space-y-1">
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Vista Previa
            </label>
            <div class="relative h-40 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">
              <img
                v-if="form.bannerImage"
                :src="form.bannerImage"
                alt="Preview Banner"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-[10px] text-slate-400">Sin vista previa</span>
            </div>
          </div>

        </div>
      </div>



      <!-- Botón de Guardar -->
      <div class="flex justify-end pt-2">
        <button
          type="submit"
          class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-lg shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-2"
        >
          <font-awesome-icon icon="floppy-disk" />
          Guardar Cambios de Inicio
        </button>
      </div>

    </form>
  </div>
</template>
