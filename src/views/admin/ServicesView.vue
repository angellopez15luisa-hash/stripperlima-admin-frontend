<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'

// Recibimos la propiedad del tema desde el dashboard/layout principal
defineProps<{
  isDark?: boolean
}>()

// Definición de la interfaz para tipar con TypeScript
interface Service {
  id: number
  title: string
  description: string
  image: string
  status: string
}

// Estados reactivos del encabezado
const isHeaderEditing = ref<boolean>(false)
const headerForm = ref({
  title: 'Nuestros Servicios',
  subtitle: 'Ofrecemos una amplia gama de servicios de entretenimiento adaptados a tus necesidades.'
})

// Estados reactivos de la tabla y filtros
const searchQuery = ref<string>('')
const selectedStatus = ref<string>('Todos')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(5)

// Datos de muestra con imágenes acordes a los servicios
const services = ref<Service[]>([
  {
    id: 1,
    title: 'Shows Privados',
    description: 'Disfruta de un espectáculo exclusivo con nuestras talentosas bailarinas en la privacidad de tu evento.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 2,
    title: 'Despedidas de Soltero',
    description: 'Paquetes especiales para despedidas de soltero con múltiples bailarinas, shows temáticos y servicio personalizado.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 3,
    title: 'Eventos Corporativos',
    description: 'Entretenimiento elegante y profesional para eventos corporativos, con bailarinas de alto nivel y shows personalizados.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 4,
    title: 'Experiencias Temáticas',
    description: 'Ambientes personalizados según tus preferencias y temáticas exclusivas para ocasiones especiales.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 5,
    title: 'Shows Privados VIP',
    description: 'Espectáculo de alta categoría con atención exclusiva para clientes preferenciales.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 6,
    title: 'Fiestas Temáticas de Verano',
    description: 'Ambientación y entretenimiento especial para eventos de temporada.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  },
  {
    id: 7,
    title: 'Show Nocturno Ejecutivo',
    description: 'Presentaciones ejecutivas nocturnas con un toque de elegancia y diversión garantizada.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 8,
    title: 'Despedidas Mixtas',
    description: 'Entretenimiento versátil y dinámico diseñado para grupos mixtos y celebraciones especiales.',
    image: 'https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=300&auto=format&fit=crop',
    status: 'Activo'
  },
  {
    id: 9,
    title: 'Aniversarios Exclusivos',
    description: 'Celebra tus fechas importantes con un show privado adaptado a la ocasión.',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=300&auto=format&fit=crop',
    status: 'Inactivo'
  }
])

// Función para guardar los cambios del encabezado
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

// Función para refrescar la data / limpiar filtros
const refreshData = () => {
  searchQuery.value = ''
  selectedStatus.value = 'Todos'
  currentPage.value = 1
}

// Función para eliminar un servicio por su id
const deleteService = (id: number) => {
  services.value = services.value.filter(service => service.id !== id)
  if (paginatedServices.value.length === 0 && currentPage.value > 1) {
    currentPage.value--
  }
}

// Propiedad computada para filtrar por texto y estado en tiempo real
const filteredServices = computed(() => {
  return services.value.filter(service => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus =
      selectedStatus.value === 'Todos' || service.status === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})

// Total de páginas basadas en el resultado filtrado
const totalPages = computed(() => {
  return Math.ceil(filteredServices.value.length / rowsPerPage.value) || 1
})

// Volver a la página 1 cuando cambie el filtro o la búsqueda
watch([searchQuery, selectedStatus], () => {
  currentPage.value = 1
})

// Elementos que se muestran en la tabla según la paginación actual
const paginatedServices = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + Number(rowsPerPage.value)
  return filteredServices.value.slice(start, end)
})

// Índices para el texto "Showing X - Y of Z"
const startIndex = computed(() => {
  if (filteredServices.value.length === 0) return 0
  return (currentPage.value - 1) * Number(rowsPerPage.value) + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * Number(rowsPerPage.value), filteredServices.value.length)
})

// Algoritmo profesional para generar los números y puntos suspensivos
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
  <!-- <div :class="{ dark: isDark }" class="min-h-screen"> -->
    <div class="w-full p-6 space-y-6">

      <!-- Título de la vista -->
      <div class="space-y-1">
        <h1 class="text-xl font-bold text-slate-900 dark:text-white tracking-wide">Mantenimiento Sección: Servicios</h1>
        <p class="text-xs text-slate-500 dark:text-slate-400">Personaliza los títulos principales, el contenido descriptivo y las imágenes de los servicios de la landing.</p>
      </div>

      <!-- Tarjeta de Encabezado (Con tono más suave y elegante en dark: bg-[#111827]) -->
      <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
        <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800/60 pb-4">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-xs">H</span>
            <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Encabezado de la Sección</h2>
          </div>
          <button
            @click="isHeaderEditing = !isHeaderEditing"
            type="button"
            class="px-3.5 py-1.5 text-xs font-semibold tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-[#1f2937] dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/60 transition-all flex items-center gap-2 cursor-pointer"
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
              :class="isHeaderEditing ? 'bg-white dark:bg-[#1f2937] border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#1f2937]/50 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 opacity-80 cursor-not-allowed'"
              class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Subtítulo de Cabecera</label>
            <input
              type="text"
              v-model="headerForm.subtitle"
              :disabled="!isHeaderEditing"
              :class="isHeaderEditing ? 'bg-white dark:bg-[#1f2937] border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#1f2937]/50 border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 opacity-80 cursor-not-allowed'"
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

      <!-- Tabla de Servicios (Con tono más suave y elegante en dark: bg-[#111827]) -->
      <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">

        <div class="p-6 border-b border-slate-200 dark:border-slate-800/60 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent">
          <div>
            <h2 class="text-sm font-bold text-slate-800 dark:text-white">Gestión de Servicios</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400">Administra las tarjetas y contenidos que se muestran en el sitio web.</p>
          </div>

          <div class="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
            <div class="relative w-full sm:w-64">
              <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                <font-awesome-icon icon="magnifying-glass" class="text-xs" />
              </span>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Buscar servicio..."
                class="w-full bg-slate-50 dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700/60 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
              />
            </div>

            <div class="relative w-full sm:w-44">
              <select
                v-model="selectedStatus"
                class="w-full bg-slate-50 dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-200 focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer shadow-sm"
              >
                <option value="Todos">Todos los estados</option>
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
              <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 pointer-events-none">
                <font-awesome-icon icon="chevron-down" class="text-xs" />
              </span>
            </div>

            <button
              @click="refreshData"
              type="button"
              class="w-[36px] h-[36px] bg-slate-50 dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl transition-all flex items-center justify-center shadow-sm cursor-pointer"
              title="Refrescar data"
            >
              <font-awesome-icon icon="sync" class="text-xs" />
            </button>

            <button
              type="button"
              class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-sm cursor-pointer"
            >
              <font-awesome-icon icon="plus" class="text-xs" /> Nuevo Servicio
            </button>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-200 dark:border-slate-800/60 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-[#111827]">
                <th class="py-3 px-6">Imagen</th>
                <th class="py-3 px-6">Título (Title)</th>
                <th class="py-3 px-6">Descripción (Description)</th>
                <th class="py-3 px-6">Estado</th>
                <th class="py-3 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200 dark:divide-slate-800/60 text-xs text-slate-700 dark:text-slate-300">
              <tr v-for="service in paginatedServices" :key="service.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td class="py-3.5 px-6">
                  <img :src="service.image" alt="Preview" class="w-14 h-9 object-cover rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm" />
                </td>
                <td class="py-3.5 px-6 font-semibold text-slate-900 dark:text-white">{{ service.title }}</td>
                <td class="py-3.5 px-6 text-slate-500 dark:text-slate-400 max-w-xs truncate">{{ service.description }}</td>
                <td class="py-3.5 px-6">
                  <span
                    :class="service.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'"
                    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium border"
                  >
                    <span :class="service.status === 'Activo' ? 'bg-emerald-500 dark:bg-emerald-400' : 'bg-amber-500 dark:bg-amber-400'" class="w-1.5 h-1.5 rounded-full"></span>
                    {{ service.status }}
                  </span>
                </td>
                <td class="py-3.5 px-6 text-right space-x-2">
                  <button type="button" class="text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors p-1 cursor-pointer" title="Editar">
                    <font-awesome-icon icon="pen-to-square" class="text-xs" />
                  </button>
                  <button @click="deleteService(service.id)" type="button" class="text-slate-400 hover:text-red-500 transition-colors p-1 cursor-pointer" title="Eliminar">
                    <font-awesome-icon icon="trash" class="text-xs" />
                  </button>
                </td>
              </tr>
              <tr v-if="paginatedServices.length === 0">
                <td colspan="5" class="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
                  No se encontraron servicios que coincidan con la búsqueda.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Paginación -->
        <div class="p-4 border-t border-slate-200 dark:border-slate-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div class="flex items-center gap-2">
            <span>Showing {{ startIndex }} - {{ endIndex }} of {{ filteredServices.length }}</span>
            <div class="flex items-center gap-1.5 ml-4">
              <span>Rows</span>
              <select v-model="rowsPerPage" @change="currentPage = 1" class="bg-slate-50 dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700/60 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="20">20</option>
              </select>
            </div>
          </div>

          <div class="flex items-center gap-1">
            <button
              @click="currentPage > 1 && currentPage--"
              :disabled="currentPage === 1"
              type="button"
              class="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &lt;
            </button>

            <template v-for="(page, index) in displayedPages" :key="index">
              <span v-if="page === '...'" class="w-7 h-7 flex items-center justify-center text-slate-400 font-bold">
                ...
              </span>
              <button
                v-else
                @click="currentPage = Number(page)"
                type="button"
                :class="[
                  'w-7 h-7 flex items-center justify-center rounded-lg font-semibold shadow-sm cursor-pointer transition-all',
                  currentPage === page ? 'bg-emerald-600 text-white' : 'bg-slate-50 dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                ]"
              >
                {{ page }}
              </button>
            </template>

            <button
              @click="currentPage < totalPages && currentPage++"
              :disabled="currentPage === totalPages || totalPages === 0"
              type="button"
              class="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-[#1f2937] border border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              &gt;
            </button>
          </div>
        </div>

      </div>

    </div>
  <!-- </div> -->
</template>
