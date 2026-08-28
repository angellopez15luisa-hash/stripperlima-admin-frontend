<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface EventItem {
  id: number
  title: string
  image: string
  status: string
}

const searchQuery = ref<string>('')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(8)

// 20 registros de muestra para probar la paginación de eventos
const events = ref<EventItem[]>([
  { id: 1, title: 'BUS COMERCIAL', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 2, title: 'SHOW PRIVADO', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 3, title: 'DESPEDIDAS', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 4, title: 'FIESTA TEMÁTICA', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 5, title: 'SHOW EN VIVO', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 6, title: 'EVENTO CORPORATIVO', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 7, title: 'BUS COMERCIAL VIP', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 8, title: 'SHOW EXCLUSIVO', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 9, title: 'FIESTA NOCTURNA', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 10, title: 'SHOW DE ANIMACIÓN', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 11, title: 'EVENTO PRIVADO', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 12, title: 'BUS RUMBA', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 13, title: 'SHOW NOCHE', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 14, title: 'DESPEDIDA SOLTERA', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 15, title: 'SHOW INTERNACIONAL', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 16, title: 'FIESTA PRIVADA', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 17, title: 'EVENTO DISCO', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 18, title: 'SHOW ESPECIAL', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 19, title: 'BUS PARANDERO', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 20, title: 'GALA DE EVENTOS', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 21, title: 'SHOW NOCTURNO', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 22, title: 'FIESTA VIP', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 23, title: 'BUS PARTY', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 24, title: 'EVENTO LUNA', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 25, title: 'SHOW LATINO', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 26, title: 'DESPEDIDA SOLTEROS', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 27, title: 'FIESTA DE VERANO', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 28, title: 'SHOW DE GALA', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 29, title: 'BUS TURISTICO', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 30, title: 'EVENTO ARTÍSTICO', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 31, title: 'SHOW URBANO', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 32, title: 'FIESTA RETRO', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 33, title: 'BUS SHOW', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 34, title: 'EVENTO PREMIUM', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 35, title: 'SHOW ACROBÁTICO', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 36, title: 'FIESTA MASTER', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 37, title: 'BUS DIVERSIÓN', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 38, title: 'SHOW ESTELAR', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 39, title: 'EVENTO OPEN AIR', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 40, title: 'FIESTA TROPICAL', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 41, title: 'BUS FESTIVAL', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 42, title: 'SHOW CABARET', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 43, title: 'EVENTO ANIVERSARIO', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 44, title: 'FIESTA BLANCA', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 45, title: 'BUS FIESTEROS', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 46, title: 'SHOW FANTASÍA', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 47, title: 'EVENTO VIP CLUB', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 48, title: 'FIESTA NEON', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 49, title: 'BUS EXPRESS', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 50, title: 'SHOW MAGIA', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 51, title: 'EVENTO EXCLUSIVO B', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 52, title: 'FIESTA GLOBAL', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 53, title: 'BUS NOCTURNO', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 54, title: 'SHOW RITMO LATINO', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 55, title: 'EVENTO COCTEL', image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 56, title: 'FIESTA UNDERGROUND', image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 57, title: 'BUS IMPERIAL', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 58, title: 'SHOW SURPRISE', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 59, title: 'EVENTO SECTRET', image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 60, title: 'GRAN FIESTA FINAL', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=400&auto=format&fit=crop', status: 'Activo' }
])

const refreshData = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const deleteEvent = (id: number) => {
  events.value = events.value.filter(event => event.id !== id)
  if (paginatedEvents.value.length === 0 && currentPage.value > 1) {
    currentPage.value--
  }
}

const filteredEvents = computed(() => {
  return events.value.filter(event => {
    return event.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredEvents.value.length / rowsPerPage.value) || 1
})

watch(searchQuery, () => {
  currentPage.value = 1
})

const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + Number(rowsPerPage.value)
  return filteredEvents.value.slice(start, end)
})

const startIndex = computed(() => {
  if (filteredEvents.value.length === 0) return 0
  return (currentPage.value - 1) * Number(rowsPerPage.value) + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * Number(rowsPerPage.value), filteredEvents.value.length)
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
  <div class="p-8 space-y-8 bg-[#0b0f19] min-h-screen text-slate-100 font-sans">

    <!-- CABECERA Y SECCIÓN 1: Mantenimiento de Textos -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-white tracking-wide">Mantenimiento Sección: Eventos</h1>
      <p class="text-sm text-slate-400">Personaliza el título principal, descripción y gestiona el catálogo de eventos del sitio web.</p>
    </div>

    <!-- Tarjeta de Encabezado -->
    <div class="bg-[#0b0f19] p-6 rounded-2xl border border-slate-800/80 shadow-xl space-y-6">
      <div class="flex justify-between items-center border-b border-slate-800 pb-4">
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400 font-bold border border-pink-500/20">M</span>
          <h2 class="text-base font-semibold text-white">Encabezado de la Sección</h2>
        </div>
        <button class="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-[#121824] hover:bg-slate-800 text-slate-200 rounded-xl border border-slate-700/65 transition-all flex items-center gap-2 cursor-pointer">
          <font-awesome-icon icon="pen-to-square" /> Habilitar Edición
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Título Principal (Ej. Galerías de Eventos)</label>
          <input
            type="text"
            disabled
            value="Galería de Eventos"
            class="w-full bg-[#121824] border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none opacity-80 cursor-not-allowed"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Subtítulo Descriptivo</label>
          <input
            type="text"
            disabled
            value="Descubre algunos de nuestros eventos más memorables y déjate inspirar para tu próxima celebración."
            class="w-full bg-[#121824] border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none opacity-80 cursor-not-allowed"
          />
        </div>
      </div>

      <div class="flex justify-end pt-2">
        <button class="px-5 py-2.5 bg-pink-600/20 hover:bg-pink-600/30 text-pink-400 text-sm font-medium rounded-xl border border-pink-500/30 transition-all flex items-center gap-2 cursor-pointer">
          <font-awesome-icon icon="floppy-disk" /> Guardar Cambios
        </button>
      </div>
    </div>

    <!-- SECCIÓN 2: Gestión de Eventos (Grid de Imágenes) -->
    <div class="bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">

      <!-- Cabecera / Filtros -->
      <div class="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent">
        <div>
          <h2 class="text-base font-bold text-white">Catálogo de Eventos</h2>
          <p class="text-xs text-slate-400">Crea, agrega o administra las fotos del bloque de eventos.</p>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          <!-- Buscador -->
          <div class="relative w-full sm:w-60">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <font-awesome-icon icon="magnifying-glass" class="text-xs" />
            </span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar por título..."
              class="w-full bg-[#121824] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors shadow-sm"
            />
          </div>

          <!-- Botón Refrescar Cuadrado -->
          <button
            @click="refreshData"
            class="w-[38px] h-[38px] bg-[#121824] border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl transition-all flex items-center justify-center shadow-sm cursor-pointer"
            title="Refrescar data"
          >
            <font-awesome-icon icon="sync" class="text-xs" />
          </button>

          <!-- Botón Nuevo Evento Rosa -->
          <button class="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-pink-900/20 cursor-pointer">
            <font-awesome-icon icon="plus" class="text-xs" /> Nuevo Evento
          </button>
        </div>
      </div>

      <!-- Grid de Imágenes de Eventos -->
      <div class="p-6">
        <div v-if="paginatedEvents.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="event in paginatedEvents"
            :key="event.id"
            class="bg-[#121824] rounded-2xl border border-slate-800/80 overflow-hidden shadow-lg group hover:border-pink-500/50 transition-all duration-300 flex flex-col"
          >
            <!-- Contenedor Imagen -->
            <div class="relative h-44 w-full overflow-hidden bg-slate-900">
              <img
                :src="event.image"
                :alt="event.title"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <!-- Badge Estado -->
              <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900/70 text-slate-300 border border-slate-700 backdrop-blur-md">
                {{ event.status }}
              </span>
            </div>

            <!-- Información e Acciones Inferiores -->
            <div class="p-4 flex items-center justify-between mt-auto border-t border-slate-800/60 bg-[#121824]">
              <div>
                <h3 class="font-semibold text-white text-xs tracking-wide">{{ event.title }}</h3>
                <p class="text-[10px] text-slate-400">ID: #{{ event.id }}</p>
              </div>
              <div class="flex items-center gap-1.5">
                <button class="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer" title="Editar">
                  <font-awesome-icon icon="pen-to-square" class="text-[10px]" />
                </button>
                <button @click="deleteEvent(event.id)" class="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center transition-colors cursor-pointer" title="Eliminar">
                  <font-awesome-icon icon="trash" class="text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado Vacío -->
        <div v-else class="py-16 text-center text-slate-500">
          <font-awesome-icon icon="face-meh" class="text-3xl mb-3 text-slate-600" />
          <p class="text-sm">No se encontraron eventos registrados con los filtros seleccionados.</p>
        </div>
      </div>

      <!-- Paginación Inferior Estilo Industria con Puntos Suspensivos -->
      <div class="p-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <div class="flex items-center gap-2">
          <span>Showing {{ startIndex }} - {{ endIndex }} of {{ filteredEvents.length }}</span>
          <div class="flex items-center gap-1.5 ml-4">
            <span>Rows</span>
            <select v-model="rowsPerPage" @change="currentPage = 1" class="bg-[#121824] border border-slate-800 rounded-lg px-2.5 py-1 text-slate-300 focus:outline-none cursor-pointer">
              <option :value="4">4</option>
              <option :value="8">8</option>
              <option :value="12">12</option>
            </select>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <!-- Botón Anterior -->
          <button
            @click="currentPage > 1 && currentPage--"
            :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#121824] border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &lt;
          </button>

          <!-- Números de Página y Puntos Suspensivos -->
          <template v-for="(page, index) in displayedPages" :key="index">
            <span v-if="page === '...'" class="w-8 h-8 flex items-center justify-center text-slate-500 font-bold">
              ...
            </span>
            <button
              v-else
              @click="currentPage = Number(page)"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded-lg font-semibold shadow-sm cursor-pointer transition-all',
                currentPage === page ? 'bg-pink-600 text-white' : 'bg-[#121824] border border-slate-800 text-slate-400 hover:bg-slate-800'
              ]"
            >
              {{ page }}
            </button>
          </template>

          <!-- Botón Siguiente -->
          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-[#121824] border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </div>

    </div>

  </div>
</template>
