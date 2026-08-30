<script setup lang="ts">
import Swal from 'sweetalert2'
import { ref, computed, watch } from 'vue'

interface PackageItem {
  id: number
  icon: string
  title: string
  description: string
  checks: string[]
  status: string
}

// Estados reactivos de filtros y paginación
const searchQuery = ref<string>('')
const selectedStatus = ref<string>('Todos')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(5)

// Estados para el Mantenimiento del Encabezado Superior
const isHeaderEditing = ref<boolean>(false)
const headerForm = ref({
  title: 'Nuestros Paquetes',
  subtitle:
    'Descubre los paquetes exclusivos diseñados para hacer de tu evento una experiencia inolvidable.',
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

// Estados para el Modal de Crear / Editar Paquete
const isModalOpen = ref<boolean>(false)
const isEditing = ref<boolean>(false)
const currentPackageId = ref<number | null>(null)

// Formulario reactivo del modal
const packageForm = ref({
  icon: 'crown',
  title: '',
  description: '',
  check1: '',
  check2: '',
  check3: '',
  status: 'Activo',
})

// 10 Registros de muestra para PackagesView
const packagesList = ref<PackageItem[]>([
  {
    id: 1,
    icon: 'crown',
    title: 'Shows Privados',
    description:
      'Espectáculos exclusivos con nuestras modelos profesionales adaptados a tus preferencias y en la ubicación que elijas.',
    checks: ['Duración de 1-2 horas', 'Personalización completa', 'Vestuario a elección'],
    status: 'Activo',
  },
  {
    id: 2,
    icon: 'circle',
    title: 'Fiestas Temáticas',
    description:
      'Celebraciones con temáticas exclusivas: Casino, Hollywood, Años 80, Piratas y muchas más opciones a elegir.',
    checks: ['Decoración temática completa', 'Modelos caracterizadas', 'Actividades relacionadas'],
    status: 'Activo',
  },
  {
    id: 3,
    icon: 'ship',
    title: 'Yacht Parties',
    description:
      'Celebra tu despedida a bordo de un yate de lujo con modelos, bebidas premium y catering exclusivo.',
    checks: ['Yate privado (4-6 horas)', 'Barra libre premium', 'Modelos y animación'],
    status: 'Activo',
  },
  {
    id: 4,
    icon: 'building',
    title: 'Paquetes Todo Incluido',
    description:
      'Solución integral para eventos corporativos y celebraciones masivas con máxima comodidad.',
    checks: ['Logística completa', 'Staff de modelos y seguridad', 'Coordinación en sitio'],
    status: 'Inactivo',
  },
  {
    id: 5,
    icon: 'glass-cheers',
    title: 'Camareras Temáticas',
    description:
      'Atención personalizada de bebidas por modelos con trajes temáticos para tu reunión.',
    checks: [
      'Servicio de barra dedicado',
      'Vestuario personalizado',
      'Atención amigable y exclusiva',
    ],
    status: 'Activo',
  },
  {
    id: 6,
    icon: 'gem',
    title: 'Servicios VIP',
    description:
      'Experiencias de máxima categoría con atención prioritaria para clientes exigentes.',
    checks: ['Acceso preferencial', 'Atención personalizada 24/7', 'Personal selecto'],
    status: 'Activo',
  },
  {
    id: 7,
    icon: 'star',
    title: 'Gala Nocturna Exclusiva',
    description: 'Espectáculo elegante ideal para cenas de gala y eventos formales.',
    checks: ['Bailarinas profesionales', 'Coreografías de gala', 'Vestuario de alta costura'],
    status: 'Activo',
  },
  {
    id: 8,
    icon: 'fire',
    title: 'Show Fuego y Pasión',
    description: 'Espectáculo visual con efectos de fuego controlado y coreografías impactantes.',
    checks: ['Efectos especiales', 'Acto de fuego controlado', 'Música sincronizada'],
    status: 'Inactivo',
  },
  {
    id: 9,
    icon: 'music',
    title: 'Noche de DJ y Show',
    description: 'La mejor combinación de música en vivo, DJ residente y modelos en escena.',
    checks: ['DJ profesional incluido', 'Animación continua', 'Interacción con el público'],
    status: 'Activo',
  },
  {
    id: 10,
    icon: 'bolt',
    title: 'Show Neón Glow',
    description:
      'Espectáculo con pintura corporal fluorescente, luces UV y coreografías vibrantes.',
    checks: ['Pintura neón UV', 'Accesorios fluorescentes', 'Efectos de iluminación'],
    status: 'Activo',
  },
])

const refreshData = () => {
  searchQuery.value = ''
  selectedStatus.value = 'Todos'
  currentPage.value = 1
}

const deletePackage = (id: number) => {
  packagesList.value = packagesList.value.filter((item) => item.id !== id)
  if (paginatedPackages.value.length === 0 && currentPage.value > 1) {
    currentPage.value--
  }
}

const openNewModal = () => {
  isEditing.value = false
  currentPackageId.value = null
  packageForm.value = {
    icon: 'crown',
    title: '',
    description: '',
    check1: '',
    check2: '',
    check3: '',
    status: 'Activo',
  }
  isModalOpen.value = true
}

const openEditModal = (item: PackageItem) => {
  isEditing.value = true
  currentPackageId.value = item.id
  packageForm.value = {
    icon: item.icon,
    title: item.title,
    description: item.description,
    check1: item.checks[0] || '',
    check2: item.checks[1] || '',
    check3: item.checks[2] || '',
    status: item.status,
  }
  isModalOpen.value = true
}

const savePackage = () => {
  if (!packageForm.value.title.trim()) return

  const checksArray = [
    packageForm.value.check1,
    packageForm.value.check2,
    packageForm.value.check3,
  ].filter((c) => c.trim() !== '')

if (isEditing.value && currentPackageId.value !== null) {
    const index = packagesList.value.findIndex(p => p.id === currentPackageId.value)
    if (index !== -1) {
      packagesList.value[index] = {
        id: currentPackageId.value, // <--- Especificamos explícitamente el ID aquí
        icon: packageForm.value.icon,
        title: packageForm.value.title,
        description: packageForm.value.description,
        checks: checksArray.length ? checksArray : ['Sin características'],
        status: packageForm.value.status
      }
    }
  } else {
    const newId = packagesList.value.length
      ? Math.max(...packagesList.value.map((p) => p.id)) + 1
      : 1
    packagesList.value.unshift({
      id: newId,
      icon: packageForm.value.icon,
      title: packageForm.value.title,
      description: packageForm.value.description,
      checks: checksArray.length ? checksArray : ['Sin características'],
      status: packageForm.value.status,
    })
  }

  isModalOpen.value = false
}

const filteredPackages = computed(() => {
  return packagesList.value.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus = selectedStatus.value === 'Todos' || item.status === selectedStatus.value

    return matchesSearch && matchesStatus
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredPackages.value.length / rowsPerPage.value) || 1
})

watch([searchQuery, selectedStatus], () => {
  currentPage.value = 1
})

const paginatedPackages = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + Number(rowsPerPage.value)
  return filteredPackages.value.slice(start, end)
})

const startIndex = computed(() => {
  if (filteredPackages.value.length === 0) return 0
  return (currentPage.value - 1) * Number(rowsPerPage.value) + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * Number(rowsPerPage.value), filteredPackages.value.length)
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
    <!-- CABECERA Y SECCIÓN 1: Mantenimiento de Textos Principales -->
    <div class="space-y-2">
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">
        Mantenimiento Sección: Paquetes
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Personaliza el título principal y el subtítulo de la sección de paquetes en la landing.
      </p>
    </div>

    <!-- Tarjeta de Encabezado -->
   <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
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

    <!-- SECCIÓN 2: Gestión de Tarjetas de Paquetes (Tabla) -->
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors duration-300"
    >
      <!-- Cabecera de la Tabla / Filtros -->
      <div
        class="p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent"
      >
        <div>
          <h2 class="text-base font-bold text-slate-900 dark:text-white">Gestión de Paquetes</h2>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Administra los iconos, títulos, descripciones y características (3 checks) de cada
            tarjeta.
          </p>
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
              placeholder="Buscar paquete..."
              class="w-full bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors shadow-sm"
            />
          </div>

          <!-- Filtro de Estados -->
          <select
            v-model="selectedStatus"
            class="bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-700 dark:text-slate-300 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            <option value="Todos">Todos los estados</option>
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>

          <!-- Botón Refrescar -->
          <button
            @click="refreshData"
            class="w-[38px] h-[38px] bg-slate-100 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition-all flex items-center justify-center shadow-sm cursor-pointer"
            title="Refrescar data"
          >
            <font-awesome-icon icon="sync" class="text-xs" />
          </button>

          <!-- Botón Nuevo Paquete Esmeralda -->
          <button
            @click="openNewModal"
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-600/20 dark:shadow-emerald-900/20 cursor-pointer"
          >
            <font-awesome-icon icon="plus" class="text-xs" /> Nuevo Paquete
          </button>
        </div>
      </div>

      <!-- Tabla de Contenido -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-[#121824]/50"
            >
              <th class="py-4 px-6">Ícono</th>
              <th class="py-4 px-6">Título (Title)</th>
              <th class="py-4 px-6">Descripción (Description)</th>
              <th class="py-4 px-6">Características (3 Checks)</th>
              <th class="py-4 px-6">Estado</th>
              <th class="py-4 px-6 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200 dark:divide-slate-800/60 text-xs">
            <tr
              v-for="item in paginatedPackages"
              :key="item.id"
              class="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
            >
              <!-- Ícono -->
              <td class="py-4 px-6">
                <div
                  class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-inner"
                >
                  <font-awesome-icon :icon="item.icon" class="text-sm" />
                </div>
              </td>
              <!-- Título -->
              <td class="py-4 px-6 font-bold text-slate-900 dark:text-white whitespace-nowrap">
                {{ item.title }}
              </td>
              <!-- Descripción -->
              <td
                class="py-4 px-6 text-slate-600 dark:text-slate-400 max-w-xs truncate"
                :title="item.description"
              >
                {{ item.description }}
              </td>
              <!-- 3 Checks -->
              <td class="py-4 px-6">
                <ul class="space-y-1 text-[11px] text-slate-600 dark:text-slate-300">
                  <li
                    v-for="(check, idx) in item.checks"
                    :key="idx"
                    class="flex items-center gap-1.5"
                  >
                    <font-awesome-icon icon="check" class="text-emerald-500 text-[10px]" />
                    <span>{{ check }}</span>
                  </li>
                </ul>
              </td>
              <!-- Estado -->
              <td class="py-4 px-6 whitespace-nowrap">
                <span
                  :class="[
                    'px-2.5 py-1 rounded-full text-[10px] font-medium border inline-flex items-center gap-1.5',
                    item.status === 'Activo'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700',
                  ]"
                >
                  <span
                    :class="[
                      'w-1.5 h-1.5 rounded-full',
                      item.status === 'Activo'
                        ? 'bg-emerald-500 dark:bg-emerald-400'
                        : 'bg-slate-400',
                    ]"
                  ></span>
                  {{ item.status }}
                </span>
              </td>
              <!-- Acciones -->
              <td class="py-4 px-6 text-right whitespace-nowrap">
                <div class="flex items-center justify-end gap-1.5">
                  <button
                    @click="openEditModal(item)"
                    class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                    title="Editar"
                  >
                    <font-awesome-icon icon="pen-to-square" class="text-[10px]" />
                  </button>
                  <button
                    @click="deletePackage(item.id)"
                    class="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer"
                    title="Eliminar"
                  >
                    <font-awesome-icon icon="trash" class="text-[10px]" />
                  </button>
                </div>
              </td>
            </tr>

            <!-- Estado Vacío -->
            <tr v-if="paginatedPackages.length === 0">
              <td colspan="6" class="py-16 text-center text-slate-400 dark:text-slate-500">
                <font-awesome-icon
                  icon="face-meh"
                  class="text-3xl mb-3 text-slate-400 dark:text-slate-600"
                />
                <p class="text-sm">
                  No se encontraron paquetes registrados con los filtros seleccionados.
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Paginación Inferior Optimizada -->
      <div
        class="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 dark:text-slate-400"
      >
        <div class="flex items-center gap-2">
          <span>Showing {{ startIndex }} - {{ endIndex }} of {{ filteredPackages.length }}</span>
          <div class="flex items-center gap-1.5 ml-4">
            <span>Rows</span>
            <select
              v-model="rowsPerPage"
              @change="currentPage = 1"
              class="bg-slate-50 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
            </select>
          </div>
        </div>

        <div class="flex items-center gap-1">
          <!-- Botón Anterior -->
          <button
            @click="currentPage > 1 && currentPage--"
            :disabled="currentPage === 1"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &lt;
          </button>

          <!-- Números de Página y Puntos Suspensivos -->
          <template v-for="(page, index) in displayedPages" :key="index">
            <span
              v-if="page === '...'"
              class="w-8 h-8 flex items-center justify-center text-slate-400 dark:text-slate-500 font-bold"
            >
              ...
            </span>
            <button
              v-else
              @click="currentPage = Number(page)"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded-lg font-semibold shadow-sm cursor-pointer transition-all',
                currentPage === page
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800',
              ]"
            >
              {{ page }}
            </button>
          </template>

          <!-- Botón Siguiente -->
          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-[#121824] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL DE CREACIÓN / EDICIÓN -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/70 backdrop-blur-sm p-4"
    >
      <div
        class="bg-white dark:bg-[#121824] border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl space-y-6 p-6 transition-colors duration-300"
      >
        <div
          class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4"
        >
          <h3 class="text-base font-bold text-slate-900 dark:text-white">
            {{ isEditing ? 'Editar Paquete' : 'Nuevo Paquete' }}
          </h3>
          <button
            @click="isModalOpen = false"
            class="text-slate-400 hover:text-slate-700 dark:hover:text-white text-sm cursor-pointer"
          >
            <font-awesome-icon icon="xmark" />
          </button>
        </div>

        <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <label
              class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1"
              >Título del Paquete</label
            >
            <input
              type="text"
              v-model="packageForm.title"
              placeholder="Ej. Shows Exclusivos"
              class="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1"
                >Ícono (FontAwesome)</label
              >
              <input
                type="text"
                v-model="packageForm.icon"
                placeholder="Ej. crown, star, ship"
                class="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label
                class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1"
                >Estado</label
              >
              <select
                v-model="packageForm.status"
                class="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div>
            <label
              class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-1"
              >Descripción</label
            >
            <textarea
              v-model="packageForm.description"
              rows="3"
              placeholder="Descripción breve del paquete..."
              class="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-slate-900 dark:text-slate-200 text-sm focus:outline-none focus:border-emerald-500 resize-none"
            ></textarea>
          </div>

          <div class="space-y-2">
            <label
              class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider"
              >Características (3 Checks)</label
            >
            <input
              type="text"
              v-model="packageForm.check1"
              placeholder="Característica 1"
              class="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-emerald-500 mb-1.5"
            />
            <input
              type="text"
              v-model="packageForm.check2"
              placeholder="Característica 2"
              class="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-emerald-500 mb-1.5"
            />
            <input
              type="text"
              v-model="packageForm.check3"
              placeholder="Característica 3"
              class="w-full bg-slate-50 dark:bg-[#0b0f19] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-slate-900 dark:text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            @click="isModalOpen = false"
            class="px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
          >
            Cancelar
          </button>
          <button
            @click="savePackage"
            class="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20 dark:shadow-emerald-900/20 cursor-pointer"
          >
            {{ isEditing ? 'Guardar Cambios' : 'Crear Paquete' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
