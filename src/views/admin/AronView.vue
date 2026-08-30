<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'

// Importar el editor Quill para Vue 3 y sus estilos
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

// Interfaz para tipar las imágenes del grid
interface GalleryImage {
  id: number
  url: string
  file: File | null
}

// Estado del formulario tipado correctamente
const form = ref({
  sectionTitle: 'Araon el Indomable',
  sectionSubtitle: 'La elegancia del deseo. El arte de la seducción.',

  headingText: 'El Mejor Experiencia en Despedidas de Soltero',
  description1: 'La elegancia del deseo. El arte de la seducción. Para quienes buscan una experiencia inolvidable en su despedida de soltero, Araon el Indomable ofrece un espectáculo exclusivo, designed para cautivar, entretener y elevar la celebración a un nivel superior.',

  features: [
    'Estilo, presencia y sofisticación',
    'Coreografía profesional y carisma natural',
    'Ambiente cuidado, discreto y de alta categoría',
    'Donde la seducción se viste de gala',
    '“No es un show, es una experiencia”',
    'Elegancia, deseo... y un poco de locura.',
    'Cuando lo exclusivo se vuelve tentación.'
  ],

  // Descripción inferior con HTML integrado para el editor enriquecido
  footerDescriptionHtml: `
    <p>No es solo un show... Es una experiencia pensada para quienes valoran el detalle, la estética y el buen gusto. Una noche para recordar... y jamás contaría igual.</p>
    <p>Disponible para eventos privados, despedidas de soltero, celebraciones íntimas y noches especiales.</p>
    <p>Consultas y reservas: <strong>947 272 595</strong></p>
    <p>Araon el Indomable Porque el placer también puede tener clase.</p>
  `,

  images: [
    { id: 1, url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600', file: null },
    { id: 2, url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600', file: null },
    { id: 3, url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600', file: null },
    { id: 4, url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600', file: null },
    { id: 5, url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600', file: null },
    { id: 6, url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600', file: null },
  ] as GalleryImage[]
})

// Manejar cambio de imagen individual sin errores de TS
const handleImageChange = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const file = target.files[0]
    if (file) {
      form.value.images[index]!.file = file

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result
        if (typeof result === 'string') {
          form.value.images[index]!.url = result
        }
      }
      reader.readAsDataURL(file)
    }
  }
}

// Guardar cambios general
const handleSubmit = () => {
  Swal.fire({
    title: '¡Actualizado!',
    text: 'Los cambios de la sección Aron se han guardado correctamente.',
    icon: 'success',
    confirmButtonColor: '#059669',
    background: '#0f172a',
    color: '#f8fafc',
  })
}
</script>

<template>
  <div class="w-full p-8 space-y-8">

    <div class="border-b border-slate-200 dark:border-slate-800 pb-5">
      <h1 class="text-xl font-bold text-slate-900 dark:text-white">Mantenimiento Sección: Aron</h1>
      <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
        Personaliza los textos principales, el contenido descriptivo y las 6 fotografías amplias de la sección.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">

      <div class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <font-awesome-icon icon="heading" class="text-emerald-500" />
          Encabezado de la Sección
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Título Principal (Ej. Araon el Indomable)
            </label>
            <input
              v-model="form.sectionTitle"
              type="text"
              class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Subtítulo de Cabecera
            </label>
            <input
              v-model="form.sectionSubtitle"
              type="text"
              class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        <div class="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <font-awesome-icon icon="pen-to-square" class="text-emerald-500" />
            Editor de Contenido (Izquierda)
          </h2>

          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Título Destacado (H2)
            </label>
            <input
              v-model="form.headingText"
              type="text"
              class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition font-semibold"
            />
          </div>

          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
              Primer Párrafo Descriptivo
            </label>
            <textarea
              v-model="form.description1"
              rows="4"
              class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Viñetas con Check (Características)
            </label>
            <div v-for="(feature, index) in form.features" :key="index" class="flex items-center gap-2">
              <span class="text-emerald-500 text-xs">✔</span>
              <input
                v-model="form.features[index]"
                type="text"
                class="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div class="space-y-2 pt-2">
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400">
              Texto Inferior Enriquecido (Párrafos y Reservas)
            </label>
            <div class="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
              <QuillEditor
                v-model:content="form.footerDescriptionHtml"
                contentType="html"
                theme="snow"
                style="min-height: 160px;"
              />
            </div>
          </div>
        </div>

        <div class="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <font-awesome-icon icon="images" class="text-emerald-500" />
              Galería Ampliada de 6 Imágenes Fijas
            </h2>
            <span class="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full">
              Grid 2x3 Ancho
            </span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-5">
            <div v-for="(img, index) in form.images" :key="img.id" class="space-y-2">
              <label class="block text-[11px] font-medium text-slate-600 dark:text-slate-400">
                Foto #{{ index + 1 }}
              </label>

              <label class="relative group block h-40 sm:h-44 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 cursor-pointer shadow-md">
                <img :src="img.url" alt="Preview" class="w-full h-full object-cover group-hover:scale-105 transition duration-300" />

                <div class="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center text-white text-center p-3">
                  <font-awesome-icon icon="cloud-arrow-up" class="text-emerald-400 text-lg mb-1" />
                  <span class="text-xs font-medium">Cambiar imagen</span>
                </div>

                <input type="file" class="hidden" accept="image/*" @change="(e) => handleImageChange(e, index)" />
              </label>
            </div>
          </div>

          <p class="text-xs text-slate-400 italic text-center pt-2">
            Haz clic sobre cualquiera de las 6 imágenes ampliadas para actualizarla individualmente al instante.
          </p>
        </div>

      </div>

      <div class="flex justify-end pt-2">
        <button
          type="submit"
          class="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-lg shadow-emerald-600/25 transition-all cursor-pointer flex items-center gap-2"
        >
          <font-awesome-icon icon="floppy-disk" />
          Guardar Cambios de Sección Aron
        </button>
      </div>

    </form>
  </div>
</template>
