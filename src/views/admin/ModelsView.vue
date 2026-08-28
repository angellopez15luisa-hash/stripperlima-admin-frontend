<script setup lang="ts">
import { ref, computed, watch } from 'vue'

// Interfaz para tipar los modelos
interface ModelItem {
  id: number
  name: string
  category: 'Bailarinas' | 'Strippers'
  image: string
  status: string
}

// Estados reactivos
const searchQuery = ref<string>('')
const selectedCategory = ref<string>('Todos')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(8) // 8 elementos por defecto para ver bien el grid de imágenes

// Data de muestra amplia para probar el paginado y los puntos suspensivos
const models = ref<ModelItem[]>([
  { id: 1, name: 'Valentina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 2, name: 'Camila', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 3, name: 'Alejandro', category: 'Strippers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 4, name: 'Matías', category: 'Strippers', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 5, name: 'Sofía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 6, name: 'Lucía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 7, name: 'Diego', category: 'Strippers', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 8, name: 'Carlos', category: 'Strippers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 9, name: 'Victoria', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 10, name: 'Isabella', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 11, name: 'Rodrigo', category: 'Strippers', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 12, name: 'Bruno', category: 'Strippers', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 13, name: 'Renata', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 14, name: 'Florencia', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 15, name: 'Gonzalo', category: 'Strippers', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 16, name: 'Stefano', category: 'Strippers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 17, name: 'Martina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 18, name: 'Antonia', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 19, name: 'Joaquín', category: 'Strippers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 20, name: 'Ignacio', category: 'Strippers', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 21, name: 'Catalina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 22, name: 'Javiera', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 23, name: 'Alonso', category: 'Strippers', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 24, name: 'Sebastián', category: 'Strippers', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 25, name: 'Amanda', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 26, name: 'Julieta', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 27, name: 'Lucas', category: 'Strippers', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 28, name: 'Mateo S.', category: 'Strippers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 29, name: 'Emilia', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 30, name: 'Rafaela', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 31, name: 'Gabriel', category: 'Strippers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 32, name: 'Dante', category: 'Strippers', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 33, name: 'Trinidad', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 34, name: 'Maite', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 35, name: 'Vicente', category: 'Strippers', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 36, name: 'Maximiliano', category: 'Strippers', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 37, name: 'Agustina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 38, name: 'Josefina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 39, name: 'Felipe', category: 'Strippers', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 40, name: 'Simón', category: 'Strippers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 41, name: 'Paulina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 42, name: 'Constanza', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 43, name: 'Tomás', category: 'Strippers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 44, name: 'Franco', category: 'Strippers', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 45, name: 'Belén', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 46, name: 'Dominique', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 47, name: 'Cristóbal', category: 'Strippers', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 48, name: 'Martin', category: 'Strippers', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 49, name: 'Bárbara', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 50, name: 'Daniela', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 51, name: 'Esteban', category: 'Strippers', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 52, name: 'Mauricio', category: 'Strippers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 53, name: 'Valeria', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 54, name: 'Antonia G.', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 55, name: 'Eduardo', category: 'Strippers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 56, name: 'Ignacio M.', category: 'Strippers', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 57, name: 'Margarita', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 58, name: 'Fernanda', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 59, name: 'Alvaro', category: 'Strippers', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 60, name: 'Renzo', category: 'Strippers', image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=400&auto=format&fit=crop', status: 'Activo' }
])

// Función para refrescar / limpiar filtros
const refreshData = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Todos'
  currentPage.value = 1
}

// Función para eliminar un modelo
const deleteModel = (id: number) => {
  models.value = models.value.filter(model => model.id !== id)
  if (paginatedModels.value.length === 0 && currentPage.value > 1) {
    currentPage.value--
  }
}

// Filtrar modelos por nombre y categoría
const filteredModels = computed(() => {
  return models.value.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'Todos' || model.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

// Total de páginas
const totalPages = computed(() => {
  return Math.ceil(filteredModels.value.length / rowsPerPage.value) || 1
})

// Resetear página al buscar o cambiar categoría
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

// Modelos paginados para mostrar en el grid
const paginatedModels = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + Number(rowsPerPage.value)
  return filteredModels.value.slice(start, end)
})

// Textos de conteo inferior
const startIndex = computed(() => {
  if (filteredModels.value.length === 0) return 0
  return (currentPage.value - 1) * Number(rowsPerPage.value) + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * Number(rowsPerPage.value), filteredModels.value.length)
})

// Algoritmo de puntos suspensivos para la paginación
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
      <h1 class="text-2xl font-bold text-white tracking-wide">Mantenimiento Sección: Modelos</h1>
      <p class="text-sm text-slate-400">Personaliza el título principal, descripción y gestiona el catálogo de modelos del sitio web.</p>
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
          <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Título Principal (Ej. Nuestros Modelos)</label>
          <input
            type="text"
            disabled
            value="Nuestros Modelos"
            class="w-full bg-[#121824] border border-slate-800 rounded-xl px-4 py-3 text-slate-300 text-sm focus:outline-none opacity-80 cursor-not-allowed"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Subtítulo Descriptivo</label>
          <input
            type="text"
            disabled
            value="Conoce a nuestro exclusivo elenco de modelos profesionales, disponibles para hacer de tu evento una experiencia inolvidable."
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

    <!-- SECCIÓN 2: Gestión de Modelos (Grid de Imágenes) -->
    <div class="bg-[#0b0f19] rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden">

      <!-- Cabecera / Filtros -->
      <div class="p-6 border-b border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent">
        <div>
          <h2 class="text-base font-bold text-white">Catálogo de Modelos</h2>
          <p class="text-xs text-slate-400">Filtra, agrega o administra las fotos del elenco (Bailarinas y Strippers).</p>
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
              placeholder="Buscar por nombre..."
              class="w-full bg-[#121824] border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors shadow-sm"
            />
          </div>

          <!-- Selector de Categorías (Bailarinas / Strippers) -->
          <div class="relative w-full sm:w-44">
            <select
              v-model="selectedCategory"
              class="w-full bg-[#121824] border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-pink-500 transition-colors appearance-none cursor-pointer shadow-sm"
            >
              <option value="Todos">Todas las categorías</option>
              <option value="Bailarinas">Bailarinas</option>
              <option value="Strippers">Strippers</option>
            </select>
            <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 pointer-events-none">
              <font-awesome-icon icon="chevron-down" class="text-xs" />
            </span>
          </div>

          <!-- Botón Refrescar Cuadrado -->
          <button
            @click="refreshData"
            class="w-[38px] h-[38px] bg-[#121824] border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-xl transition-all flex items-center justify-center shadow-sm cursor-pointer"
            title="Refrescar data"
          >
            <font-awesome-icon icon="sync" class="text-xs" />
          </button>

          <!-- Botón Nuevo Modelo Rosa -->
          <button class="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-pink-900/20 cursor-pointer">
            <font-awesome-icon icon="plus" class="text-xs" /> Nuevo Modelo
          </button>
        </div>
      </div>

      <!-- Grid de Imágenes de Modelos -->
      <div class="p-6">
        <div v-if="paginatedModels.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="model in paginatedModels"
            :key="model.id"
            class="bg-[#121824] rounded-2xl border border-slate-800/80 overflow-hidden shadow-lg group hover:border-pink-500/50 transition-all duration-300 flex flex-col"
          >
            <!-- Contenedor Imagen -->
            <div class="relative h-72 w-full overflow-hidden bg-slate-900">
              <img
                :src="model.image"
                :alt="model.name"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <!-- Badge Categoría -->
              <span :class="[
                'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-md',
                model.category === 'Bailarinas' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
              ]">
                {{ model.category }}
              </span>
              <!-- Badge Estado -->
              <span class="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium bg-slate-900/70 text-slate-300 border border-slate-700 backdrop-blur-md">
                {{ model.status }}
              </span>
            </div>

            <!-- Información e Acciones Inferiores -->
            <div class="p-4 flex items-center justify-between mt-auto border-t border-slate-800/60 bg-[#121824]">
              <div>
                <h3 class="font-semibold text-white text-sm tracking-wide">{{ model.name }}</h3>
                <p class="text-xs text-slate-400">ID: #{{ model.id }}</p>
              </div>
              <div class="flex items-center gap-1.5">
                <button class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors cursor-pointer" title="Editar">
                  <font-awesome-icon icon="pen-to-square" class="text-xs" />
                </button>
                <button @click="deleteModel(model.id)" class="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center transition-colors cursor-pointer" title="Eliminar">
                  <font-awesome-icon icon="trash" class="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Estado Vacío -->
        <div v-else class="py-16 text-center text-slate-500">
          <font-awesome-icon icon="face-meh" class="text-3xl mb-3 text-slate-600" />
          <p class="text-sm">No se encontraron modelos registrados con los filtros seleccionados.</p>
        </div>
      </div>

      <!-- Paginación Inferior Estilo Industria con Puntos Suspensivos -->
      <div class="p-4 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <div class="flex items-center gap-2">
          <span>Showing {{ startIndex }} - {{ endIndex }} of {{ filteredModels.length }}</span>
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
