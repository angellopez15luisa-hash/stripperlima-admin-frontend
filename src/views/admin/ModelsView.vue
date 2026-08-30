<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import Swal from 'sweetalert2'

// --- SINCRONIZACIÓN CON EL BOTÓN DE LA LUNA DEL HEADER GENERAL ---
const isDarkMode = ref<boolean>(true)

const headerForm = ref({
  title: 'Nuestros Servicios',
  subtitle: 'Ofrecemos una amplia gama de servicios de entretenimiento adaptados a tus necesidades.'
})

const syncTheme = () => {
  const isDark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark')
  isDarkMode.value = isDark
}

onMounted(() => {
  syncTheme()
  const observer = new MutationObserver(() => {
    syncTheme()
  })
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
  observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
})

// --- ESTADO DE LA SECCIÓN (ENCABEZADO) ---
const isHeaderEditing = ref<boolean>(false)

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

// --- INTERFAZ Y MODELOS ---
interface ModelItem {
  id: number
  name: string
  category: 'Bailarinas' | 'Strippers'
  image: string
  status: 'Activo' | 'Inactivo'
}

const searchQuery = ref<string>('')
const selectedCategory = ref<string>('Todos')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(8)

const models = ref<ModelItem[]>([
  { id: 1, name: 'Valentina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 2, name: 'Camila', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 3, name: 'Alejandro', category: 'Strippers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 4, name: 'Matías', category: 'Strippers', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 5, name: 'Sofía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 6, name: 'Lucía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 7, name: 'Diego', category: 'Strippers', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 8, name: 'Carlos', category: 'Strippers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 9, name: 'Mariana', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 10, name: 'Andrés', category: 'Strippers', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 1, name: 'Valentina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 2, name: 'Camila', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 3, name: 'Alejandro', category: 'Strippers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 4, name: 'Matías', category: 'Strippers', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 5, name: 'Sofía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 6, name: 'Lucía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 7, name: 'Diego', category: 'Strippers', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 8, name: 'Carlos', category: 'Strippers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 9, name: 'Mariana', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 10, name: 'Andrés', category: 'Strippers', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 1, name: 'Valentina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 2, name: 'Camila', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 3, name: 'Alejandro', category: 'Strippers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 4, name: 'Matías', category: 'Strippers', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 5, name: 'Sofía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 6, name: 'Lucía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 7, name: 'Diego', category: 'Strippers', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 8, name: 'Carlos', category: 'Strippers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 9, name: 'Mariana', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 10, name: 'Andrés', category: 'Strippers', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 1, name: 'Valentina', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 2, name: 'Camila', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 3, name: 'Alejandro', category: 'Strippers', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 4, name: 'Matías', category: 'Strippers', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 5, name: 'Sofía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 6, name: 'Lucía', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop', status: 'Inactivo' },
  { id: 7, name: 'Diego', category: 'Strippers', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 8, name: 'Carlos', category: 'Strippers', image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 9, name: 'Mariana', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=400&auto=format&fit=crop', status: 'Activo' },
  { id: 10, name: 'Andrés', category: 'Strippers', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', status: 'Activo' }
])

// --- ESTADO DEL MODAL ---
const isModalOpen = ref<boolean>(false)
const isEditingModal = ref<boolean>(false)
const currentModel = ref<ModelItem>({
  id: 0,
  name: '',
  category: 'Bailarinas',
  image: '',
  status: 'Activo'
})

const openCreateModal = () => {
  isEditingModal.value = false
  currentModel.value = { id: Date.now(), name: '', category: 'Bailarinas', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop', status: 'Activo' }
  isModalOpen.value = true
}

const openEditModal = (model: ModelItem) => {
  isEditingModal.value = true
  currentModel.value = { ...model }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const handleImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const reader = new FileReader()
    reader.onload = (event) => {
      if (event.target?.result) {
        currentModel.value.image = event.target.result as string
      }
    }
    reader.readAsDataURL(target.files[0])
  }
}

const saveModel = () => {
  if (!currentModel.value.name.trim()) {
    Swal.fire({
      title: 'Campo requerido',
      text: 'Por favor, ingresa el nombre del modelo.',
      icon: 'warning',
      confirmButtonColor: '#059669',
      background: isDarkMode.value ? '#121824' : '#ffffff',
      color: isDarkMode.value ? '#f8fafc' : '#1e293b'
    })
    return
  }

  if (isEditingModal.value) {
    const index = models.value.findIndex(m => m.id === currentModel.value.id)
    if (index !== -1) {
      models.value[index] = { ...currentModel.value }
    }
  } else {
    models.value.unshift({ ...currentModel.value })
  }

  closeModal()
  Swal.fire({
    title: '¡Éxito!',
    text: isEditingModal.value ? 'Modelo actualizado correctamente.' : 'Nuevo modelo agregado con éxito.',
    icon: 'success',
    confirmButtonColor: '#059669',
    background: isDarkMode.value ? '#121824' : '#ffffff',
    color: isDarkMode.value ? '#f8fafc' : '#1e293b'
  })
}

const refreshData = () => {
  searchQuery.value = ''
  selectedCategory.value = 'Todos'
  currentPage.value = 1
}

const deleteModel = (id: number) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará al modelo del catálogo.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#64748b',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    background: isDarkMode.value ? '#121824' : '#ffffff',
    color: isDarkMode.value ? '#f8fafc' : '#1e293b'
  }).then((result) => {
    if (result.isConfirmed) {
      models.value = models.value.filter(model => model.id !== id)
      if (paginatedModels.value.length === 0 && currentPage.value > 1) {
        currentPage.value--
      }
      Swal.fire({
        title: 'Eliminado',
        text: 'El modelo ha sido eliminado.',
        icon: 'success',
        confirmButtonColor: '#059669',
        background: isDarkMode.value ? '#121824' : '#ffffff',
        color: isDarkMode.value ? '#f8fafc' : '#1e293b'
      })
    }
  })
}

// --- COMPUTED DE FILTRADO Y PAGINACIÓN ---
const filteredModels = computed(() => {
  return models.value.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'Todos' || model.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredModels.value.length / rowsPerPage.value) || 1
})

watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

const paginatedModels = computed(() => {
  const start = (currentPage.value - 1) * rowsPerPage.value
  const end = start + Number(rowsPerPage.value)
  return filteredModels.value.slice(start, end)
})

const startIndex = computed(() => {
  if (filteredModels.value.length === 0) return 0
  return (currentPage.value - 1) * Number(rowsPerPage.value) + 1
})

const endIndex = computed(() => {
  return Math.min(currentPage.value * Number(rowsPerPage.value), filteredModels.value.length)
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
  <div :class="[
    'p-8 space-y-8 min-h-screen font-sans transition-colors duration-300',
    isDarkMode ? 'bg-[#0b0f19] text-slate-100' : 'bg-slate-100 text-slate-800'
  ]">

    <!-- CABECERA Y SECCIÓN 1: Mantenimiento de Textos -->
    <div class="space-y-2">
      <h1 :class="['text-2xl font-bold tracking-wide', isDarkMode ? 'text-white' : 'text-slate-900']">Mantenimiento Sección: Modelos</h1>
      <p :class="['text-sm', isDarkMode ? 'text-slate-400' : 'text-slate-600']">Personaliza el título principal, descripción y gestiona el catálogo de modelos del sitio web.</p>
    </div>

    <!-- Tarjeta de Encabezado -->
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

    <!-- SECCIÓN 2: Catálogo de Modelos -->
    <div :class="[
      'rounded-2xl border shadow-xl overflow-hidden transition-colors duration-300',
      isDarkMode ? 'bg-[#121824] border-slate-800/80' : 'bg-white border-slate-200'
    ]">
      <div :class="['p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent', isDarkMode ? 'border-slate-800' : 'border-slate-100']">
        <div>
          <h2 :class="['text-base font-bold', isDarkMode ? 'text-white' : 'text-slate-900']">Catálogo de Modelos</h2>
          <p :class="['text-xs', isDarkMode ? 'text-slate-400' : 'text-slate-500']">Filtra, agrega o administra las fotos del elenco (Bailarinas y Strippers).</p>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          <div class="relative w-full sm:w-60">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <font-awesome-icon icon="magnifying-glass" class="text-xs" />
            </span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar por nombre..."
              :class="[
                'w-full border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors shadow-sm',
                isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-200 placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              ]"
            />
          </div>

          <div class="relative w-full sm:w-44">
            <select
              v-model="selectedCategory"
              :class="[
                'w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors appearance-none cursor-pointer shadow-sm',
                isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
              ]"
            >
              <option value="Todos">Todas las categorías</option>
              <option value="Bailarinas">Bailarinas</option>
              <option value="Strippers">Strippers</option>
            </select>
            <span class="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 pointer-events-none">
              <font-awesome-icon icon="chevron-down" class="text-xs" />
            </span>
          </div>

          <button
            @click="refreshData"
            :class="[
              'w-[38px] h-[38px] border rounded-xl transition-all flex items-center justify-center shadow-sm cursor-pointer',
              isDarkMode ? 'bg-[#0b0f19] border-slate-800 hover:bg-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
            ]"
            title="Refrescar data"
          >
            <font-awesome-icon icon="sync" class="text-xs" />
          </button>

          <!-- BOTÓN NUEVO MODELO EN VERDE -->
          <button
            @click="openCreateModal"
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-900/20 cursor-pointer"
          >
            <font-awesome-icon icon="plus" class="text-xs" /> Nuevo Modelo
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div class="p-6">
        <div v-if="paginatedModels.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="model in paginatedModels"
            :key="model.id"
            :class="[
              'rounded-2xl border shadow-lg group hover:border-emerald-500/50 transition-all duration-300 flex flex-col overflow-hidden',
              isDarkMode ? 'bg-[#0b0f19] border-slate-800/80' : 'bg-white border-slate-200'
            ]"
          >
            <div class="relative h-72 w-full overflow-hidden bg-slate-900">
              <img :src="model.image" :alt="model.name" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" />
              <span :class="[
                'absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-md',
                model.category === 'Bailarinas' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              ]">
                {{ model.category }}
              </span>
              <span :class="[
                'absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium border backdrop-blur-md',
                model.status === 'Activo' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              ]">
                {{ model.status }}
              </span>
            </div>

            <div :class="[
              'p-4 flex items-center justify-between mt-auto border-t',
              isDarkMode ? 'border-slate-800/60 bg-[#0b0f19]' : 'border-slate-100 bg-white'
            ]">
              <div>
                <h3 :class="['font-semibold text-sm tracking-wide', isDarkMode ? 'text-white' : 'text-slate-900']">{{ model.name }}</h3>
                <p :class="['text-xs', isDarkMode ? 'text-slate-400' : 'text-slate-500']">ID: #{{ model.id }}</p>
              </div>
              <div class="flex items-center gap-1.5">
                <button @click="openEditModal(model)" :class="['w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer', isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700']" title="Editar">
                  <font-awesome-icon icon="pen-to-square" class="text-xs" />
                </button>
                <button @click="deleteModel(model.id)" class="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center transition-colors cursor-pointer" title="Eliminar">
                  <font-awesome-icon icon="trash" class="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="py-16 text-center text-slate-400 dark:text-slate-500">
          <font-awesome-icon icon="face-meh" class="text-3xl mb-3 text-slate-400 dark:text-slate-600" />
          <p class="text-sm">No se encontraron modelos registrados con los filtros seleccionados.</p>
        </div>
      </div>

      <!-- Barra de Paginación Inferior con Botones en Verde -->
      <div :class="['p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs', isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500']">
        <div class="flex items-center gap-2">
          <span>Showing {{ startIndex }} - {{ endIndex }} of {{ filteredModels.length }}</span>
          <div class="flex items-center gap-1.5 ml-4">
            <span>Rows</span>
            <select v-model="rowsPerPage" @change="currentPage = 1" :class="['border rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700']">
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
            :class="['w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200']"
          >
            &lt;
          </button>

          <template v-for="(page, index) in displayedPages" :key="index">
            <span v-if="page === '...'" class="w-8 h-8 flex items-center justify-center text-slate-400 font-bold">
              ...
            </span>
            <button
              v-else
              @click="currentPage = Number(page)"
              :class="[
                'w-8 h-8 flex items-center justify-center rounded-lg font-semibold shadow-sm cursor-pointer transition-all',
                currentPage === page
                  ? 'bg-emerald-600 text-white'
                  : (isDarkMode ? 'bg-[#0b0f19] border border-slate-800 text-slate-400 hover:bg-slate-800' : 'bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-200')
              ]"
            >
              {{ page }}
            </button>
          </template>

          <button
            @click="currentPage < totalPages && currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            :class="['w-8 h-8 flex items-center justify-center rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-300 hover:bg-slate-800' : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200']"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div :class="[
        'w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden p-6 space-y-6',
        isDarkMode ? 'bg-[#121824] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
      ]">
        <div class="flex justify-between items-center border-b pb-4 border-slate-700/50">
          <h3 class="text-lg font-bold">{{ isEditingModal ? 'Editar Modelo' : 'Registrar Nuevo Modelo' }}</h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-200 text-lg cursor-pointer">&times;</button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium uppercase tracking-wider mb-2 text-slate-400">Nombre Completo</label>
            <input type="text" v-model="currentModel.name" placeholder="Ej. Valeria" :class="['w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800']" />
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium uppercase tracking-wider mb-2 text-slate-400">Categoría</label>
              <select v-model="currentModel.category" :class="['w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800']">
                <option value="Bailarinas">Bailarinas</option>
                <option value="Strippers">Strippers</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-medium uppercase tracking-wider mb-2 text-slate-400">Estado</label>
              <select v-model="currentModel.status" :class="['w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800']">
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-xs font-medium uppercase tracking-wider mb-2 text-slate-400">Imagen del Modelo</label>
            <div class="flex items-center gap-4">
              <img :src="currentModel.image" class="w-16 h-16 rounded-xl object-cover border border-slate-700" alt="Previsualización" />
              <input type="file" accept="image/*" @change="handleImageChange" :class="['w-full border rounded-xl px-3 py-2 text-xs file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600']" />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
          <button @click="closeModal" class="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 cursor-pointer transition-all">Cancelar</button>
          <button @click="saveModel" class="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/20 cursor-pointer transition-all">Guardar Modelo</button>
        </div>
      </div>
    </div>

  </div>
</template>
