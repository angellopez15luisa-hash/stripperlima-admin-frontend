<script setup lang="ts">
import Swal from "sweetalert2"
import { ref, computed, watch } from 'vue'

interface VideoItem {
  id: number
  title: string
  videoUrl: string
  status: string
}

const searchQuery = ref<string>('')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(8)

// Estados para el Mantenimiento del Encabezado Superior
const isHeaderEditing = ref<boolean>(false)
const headerForm = ref({
  title: 'Galería de Videos',
  subtitle: 'Descubre algunos de nuestros videos más memorables y déjate inspirar para tu próxima celebración.'
})

const saveHeader = () => {
  isHeaderEditing.value = false
  Swal.fire({
    title: '¡Actualizado!',
    text: 'El encabezado se ha guardado correctamente.',
    icon: 'success',
    confirmButtonColor: '#059669',
    background: '#0F172B',
    color: '#f8fafc',
  })
}

// Registros de muestra adaptados
const videos = ref<VideoItem[]>([
  { id: 1, title: 'SHOW EN VIVO - BUS COMERCIAL', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 2, title: 'SHOW PRIVADO NOCTURNO', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 3, title: 'DESPEDIDAS EXCLUSIVE', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 4, title: 'FIESTA TEMÁTICA VIP', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Inactivo' },
  { id: 5, title: 'PERFORMANCE RUMBA', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 6, title: 'EVENTO CORPORATIVO', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 7, title: 'SHOW INTERNACIONAL', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 8, title: 'FIESTA PRIVADA', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 9, title: 'BUS RUMBA EXPRESS', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 10, title: 'SHOW DE ANIMACIÓN', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 11, title: 'EVENTO EXCLUSIVO B', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Inactivo' },
  { id: 12, title: 'FIESTA NEON PARTY', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 13, title: 'SHOW NOCHE DE GALA', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 14, title: 'DESPEDIDA SOLTERA TOP', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 15, title: 'SHOW URBANO LIVE', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 16, title: 'FIESTA RETRO 80S', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 17, title: 'BUS PARANDERO VIP', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 18, title: 'SHOW ESTELAR NOCTURNO', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
  { id: 19, title: 'EVENTO OPEN AIR', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Inactivo' },
  { id: 20, title: 'FIESTA TROPICAL MIX', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', status: 'Activo' },
])

const refreshData = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const deleteVideo = (id: number) => {
  videos.value = videos.value.filter(video => video.id !== id)
  if (paginatedVideos.value.length === 0 && currentPage.value > 1) {
    currentPage.value--
  }
}

const filteredVideos = computed(() => {
  return videos.value.filter(video => {
    return video.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredVideos.value.length / rowsPerPage.value) || 1
})

watch(searchQuery, () => {
  currentPage.value = 1
})

const paginatedVideos = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + Number(rowsPerPage.value)
  return filteredVideos.value.slice(start, end)
})

const startIndex = computed(() => {
  if (filteredVideos.value.length === 0) return 0
  return (currentPage.value - 1) * Number(rowsPerPage.value) + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * Number(rowsPerPage.value), filteredVideos.value.length)
})

const displayedPages = computed(() => {
  const total = totalPages.value
  const current = currentPage.value
  const pages: (number | string)[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', total)
    } else if (current >= total - 3) {
      pages.push(1, '...', total - 4, total - 3, total - 2, total - 1, total)
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', total)
    }
  }
  return pages
})
</script>

<template>
  <div class="w-full p-6 space-y-6">

    <div class="space-y-1">
      <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Mantenimiento Sección: Galería de Videos</h1>
      <p class="text-xs text-slate-500 dark:text-slate-400">Personaliza el título principal, descripción y gestiona el catálogo de videos del sitio web.</p>
    </div>

    <!-- Sección Encabezado con color #0F172B -->
    <div class="bg-white dark:bg-[#0F172B] p-6 rounded-2xl border border-slate-200 dark:border-slate-800/80 shadow-sm space-y-6 transition-colors">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div class="flex items-center gap-3">
          <span class="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-xs">H</span>
          <h2 class="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">Encabezado de la Sección</h2>
        </div>
        <button
          @click="isHeaderEditing = !isHeaderEditing"
          type="button"
          class="px-3.5 py-1.5 text-xs font-semibold tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-[#1e293b] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/60 transition-all flex items-center gap-2 cursor-pointer"
        >
          <font-awesome-icon :icon="isHeaderEditing ? 'xmark' : 'pen-to-square'" />
          {{ isHeaderEditing ? 'Cancelar' : 'Habilitar Edición' }}
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Título Principal</label>
          <input
            type="text"
            v-model="headerForm.title"
            :disabled="!isHeaderEditing"
            :class="isHeaderEditing ? 'bg-white dark:bg-[#1e293b] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-50 dark:bg-[#1e293b]/50 border-slate-200 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 opacity-90 cursor-not-allowed'"
            class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label class="block text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2">Subtítulo de Cabecera</label>
          <input
            type="text"
            v-model="headerForm.subtitle"
            :disabled="!isHeaderEditing"
            :class="isHeaderEditing ? 'bg-white dark:bg-[#1e293b] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-50 dark:bg-[#1e293b]/50 border-slate-200 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 opacity-90 cursor-not-allowed'"
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

    <!-- Contenedor Principal de la Galería con color #0F172B -->
    <div class="bg-white dark:bg-[#0F172B] rounded-2xl border border-slate-200 dark:border-slate-800/85 shadow-xl overflow-hidden transition-colors duration-300">

      <div class="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent">
        <div>
          <h2 class="text-sm font-bold text-slate-900 dark:text-white">Catálogo de Videos</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">Crea, agrega o administra los videos del sitio web.</p>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          <div class="relative w-full sm:w-64">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <font-awesome-icon icon="magnifying-glass" class="text-xs" />
            </span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar por título..."
              class="w-full bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
            />
          </div>

          <button
            @click="refreshData"
            class="w-[34px] h-[34px] bg-slate-100 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition-all flex items-center justify-center shadow-sm cursor-pointer"
            title="Refrescar data"
          >
            <font-awesome-icon icon="sync" class="text-xs" />
          </button>

          <!-- Botón Nuevo Video -->
          <button class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-600/20 dark:shadow-emerald-950/40 cursor-pointer">
            <font-awesome-icon icon="plus" class="text-xs" /> Nuevo Video
          </button>
        </div>
      </div>

      <div class="p-6">
        <div v-if="paginatedVideos.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="video in paginatedVideos"
            :key="video.id"
            class="bg-white dark:bg-[#0F172B] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm group hover:border-emerald-500/50 transition-all duration-300 flex flex-col"
          >
            <div class="relative h-48 w-full overflow-hidden bg-slate-900 rounded-t-xl">
              <video
                :src="video.videoUrl"
                controls
                preload="metadata"
                class="w-full h-full object-cover object-center"
              ></video>
              <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900/70 text-slate-300 border border-slate-700 backdrop-blur-md z-10 pointer-events-none">
                {{ video.status }}
              </span>
            </div>

            <div class="p-4 flex items-center justify-between mt-auto bg-white dark:bg-[#0F172B]">
              <div>
                <h3 class="font-semibold text-slate-900 dark:text-white text-xs tracking-wide line-clamp-1">{{ video.title }}</h3>
                <p class="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">ID: #{{ video.id }}</p>
              </div>
              <div class="flex items-center gap-1.5">
                <button class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Editar">
                  <font-awesome-icon icon="pen-to-square" class="text-[10px]" />
                </button>
                <!-- Botón eliminar con el mismo estilo estándar del botón editar -->
                <button @click="deleteVideo(video.id)" class="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#1e293b] hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 flex items-center justify-center transition-colors cursor-pointer" title="Eliminar">
                  <font-awesome-icon icon="trash" class="text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="py-16 text-center text-slate-400 dark:text-slate-500">
          <font-awesome-icon icon="face-meh" class="text-3xl mb-3 text-slate-400 dark:text-slate-600" />
          <p class="text-xs">No se encontraron videos registrados con los filtros seleccionados.</p>
        </div>
      </div>

      <div class="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div class="flex items-center gap-2">
          <span>Mostrando {{ startIndex }} - {{ endIndex }} de {{ filteredVideos.length }}</span>
          <div class="flex items-center gap-1.5 ml-4">
            <span>Filas</span>
            <select v-model="rowsPerPage" @change="currentPage = 1" class="bg-slate-50 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">
              <option :value="4">4</option>
              <option :value="8">8</option>
              <option :value="12">12</option>
            </select>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <button
            @click="currentPage > 1 && currentPage--"
            :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &lt;
          </button>

          <template v-for="(page, index) in displayedPages" :key="index">
            <span v-if="page === '...'" class="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold">
              ...
            </span>
            <button
              v-else
              @click="currentPage = Number(page)"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded-lg font-semibold shadow-sm cursor-pointer transition-all',
                currentPage === page
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-[#1e293b] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </div>

    </div>

  </div>
</template>
