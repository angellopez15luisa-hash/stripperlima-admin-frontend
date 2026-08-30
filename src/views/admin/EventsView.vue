<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import Swal from 'sweetalert2'

// --- SINCRONIZACIÓN CON EL BOTÓN DE LA LUNA DEL HEADER GENERAL ---
const isDarkMode = ref<boolean>(true)

const headerForm = ref({
  title: 'Galería de Eventos',
  subtitle: 'Descubre algunos de nuestros eventos más memorables y déjate inspirar para tu próxima celebración.'
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
    background: isDarkMode.value ? '#121824' : '#ffffff',
    color: isDarkMode.value ? '#f8fafc' : '#1e293b'
  })
}

// --- INTERFAZ Y MODELOS ---
interface EventItem {
  id: number
  title: string
  imageUrl: string
  status: 'Activo' | 'Inactivo'
}

const searchQuery = ref<string>('')
const currentPage = ref<number>(1)
const rowsPerPage = ref<number>(8)

const events = ref<EventItem[]>([
  { id: 1, title: 'SHOW EN VIVO - BUS COMERCIAL', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', status: 'Activo' },
  { id: 2, title: 'SHOW PRIVADO NOCTURNO', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', status: 'Activo' },
  { id: 3, title: 'DESPEDIDAS EXCLUSIVE', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80', status: 'Activo' },
  { id: 4, title: 'FIESTA TEMÁTICA VIP', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', status: 'Inactivo' },
  { id: 5, title: 'PERFORMANCE RUMBA', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', status: 'Activo' },
  { id: 6, title: 'EVENTO CORPORATIVO', imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80', status: 'Activo' },
  { id: 7, title: 'SHOW INTERNACIONAL', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80', status: 'Activo' },
  { id: 8, title: 'FIESTA PRIVADA', imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80', status: 'Activo' }
])

// --- ESTADO DEL MODAL ---
const isModalOpen = ref<boolean>(false)
const isEditingModal = ref<boolean>(false)
const currentEvent = ref<EventItem>({
  id: 0,
  title: '',
  imageUrl: '',
  status: 'Activo'
})

const openCreateModal = () => {
  isEditingModal.value = false
  currentEvent.value = {
    id: Date.now(),
    title: '',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    status: 'Activo'
  }
  isModalOpen.value = true
}

const openEditModal = (event: EventItem) => {
  isEditingModal.value = true
  currentEvent.value = { ...event }
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
        currentEvent.value.imageUrl = event.target.result as string
      }
    }
    reader.readAsDataURL(target.files[0])
  }
}

const saveEvent = () => {
  if (!currentEvent.value.title.trim()) {
    Swal.fire({
      title: 'Campo requerido',
      text: 'Por favor, ingresa el título del evento.',
      icon: 'warning',
      confirmButtonColor: '#059669',
      background: isDarkMode.value ? '#121824' : '#ffffff',
      color: isDarkMode.value ? '#f8fafc' : '#1e293b'
    })
    return
  }

  if (isEditingModal.value) {
    const index = events.value.findIndex(e => e.id === currentEvent.value.id)
    if (index !== -1) {
      events.value[index] = { ...currentEvent.value }
    }
  } else {
    events.value.unshift({ ...currentEvent.value })
  }

  closeModal()
  Swal.fire({
    title: '¡Éxito!',
    text: isEditingModal.value ? 'Evento actualizado correctamente.' : 'Nuevo evento agregado con éxito.',
    icon: 'success',
    confirmButtonColor: '#059669',
    background: isDarkMode.value ? '#121824' : '#ffffff',
    color: isDarkMode.value ? '#f8fafc' : '#1e293b'
  })
}

const refreshData = () => {
  searchQuery.value = ''
  currentPage.value = 1
}

const deleteEvent = (id: number) => {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el evento del catálogo.',
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
      events.value = events.value.filter(event => event.id !== id)
      if (paginatedEvents.value.length === 0 && currentPage.value > 1) {
        currentPage.value--
      }
      Swal.fire({
        title: 'Eliminado',
        text: 'El evento ha sido eliminado.',
        icon: 'success',
        confirmButtonColor: '#059669',
        background: isDarkMode.value ? '#121824' : '#ffffff',
        color: isDarkMode.value ? '#f8fafc' : '#1e293b'
      })
    }
  })
}

// --- COMPUTED DE FILTRADO Y PAGINACIÓN ---
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
 <div class="w-full p-6 space-y-6">

    <div class="space-y-2">
      <h1 :class="['text-2xl font-bold tracking-wide', isDarkMode ? 'text-white' : 'text-slate-900']">Mantenimiento Sección: Galería de Eventos</h1>
      <p :class="['text-sm', isDarkMode ? 'text-slate-400' : 'text-slate-500']">Personaliza el título principal, descripción y gestiona el catálogo de imágenes de eventos del sitio web.</p>
    </div>

    <!-- Encabezado de la Sección -->
     <div class="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 transition-colors">
      <div class="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-4">
        <div class="flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20 text-xs">H</span>
          <h2 class="text-sm font-semibold text-slate-800 dark:text-white">Encabezado de la Sección</h2>
        </div>
        <button
          @click="isHeaderEditing = !isHeaderEditing"
          type="button"
          class="px-3.5 py-1.5 text-xs font-semibold tracking-wider bg-slate-100 hover:bg-slate-200 dark:bg-[#0b0f19] dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-700/60 transition-all flex items-center gap-2 cursor-pointer"
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
            :class="isHeaderEditing ? 'bg-white dark:bg-[#0b0f19] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#0b0f19] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed'"
            class="w-full border rounded-xl px-3.5 py-2.5 text-xs focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider mb-2">Subtítulo de Cabecera</label>
          <input
            type="text"
            v-model="headerForm.subtitle"
            :disabled="!isHeaderEditing"
            :class="isHeaderEditing ? 'bg-white dark:bg-[#0b0f19] border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:border-emerald-500' : 'bg-slate-100 dark:bg-[#0b0f19] border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-300 opacity-80 cursor-not-allowed'"
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

    <!-- Catálogo de Eventos -->
   <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-colors duration-300">
      <div :class="['p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-transparent', isDarkMode ? 'border-slate-800' : 'border-slate-100']">
        <div>
          <h2 :class="['text-base font-bold', isDarkMode ? 'text-white' : 'text-slate-900']">Catálogo de Eventos</h2>
          <p :class="['text-xs', isDarkMode ? 'text-slate-400' : 'text-slate-500']">Crea, agrega o administra las imágenes de los eventos.</p>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-end flex-wrap">
          <div class="relative w-full sm:w-60">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
              <font-awesome-icon icon="magnifying-glass" class="text-xs" />
            </span>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar por título..."
              :class="[
                'w-full border rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-emerald-500 transition-colors shadow-sm',
                isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-200 placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-800 placeholder-slate-400'
              ]"
            />
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

          <button
            @click="openCreateModal"
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-2 whitespace-nowrap shadow-lg shadow-emerald-900/20 cursor-pointer"
          >
            <font-awesome-icon icon="plus" class="text-xs" /> Nuevo Evento
          </button>
        </div>
      </div>

      <div class="p-6">
        <div v-if="paginatedEvents.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="event in paginatedEvents"
            :key="event.id"
            :class="[
              'rounded-2xl border shadow-lg group hover:border-emerald-500/50 transition-all duration-300 flex flex-col overflow-hidden',
              isDarkMode ? 'bg-[#121824] border-slate-800/80' : 'bg-white border-slate-200'
            ]"
          >
            <div class="relative h-60 w-full overflow-hidden bg-slate-900">
              <img
                :src="event.imageUrl"
                :alt="event.title"
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <span :class="[
                'absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium border backdrop-blur-md z-10 pointer-events-none',
                event.status === 'Activo' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
              ]">
                {{ event.status }}
              </span>
            </div>

            <div :class="[
              'p-4 flex items-center justify-between mt-auto border-t',
              isDarkMode ? 'border-slate-800/60 bg-[#121824]' : 'border-slate-100 bg-white'
            ]">
              <div>
                <h3 :class="['font-semibold text-xs tracking-wide', isDarkMode ? 'text-white' : 'text-slate-900']">{{ event.title }}</h3>
                <p :class="['text-[10px]', isDarkMode ? 'text-slate-400' : 'text-slate-500']">ID: #{{ event.id }}</p>
              </div>
              <div class="flex items-center gap-1.5">
                <button
                  @click="openEditModal(event)"
                  :class="['w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer', isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700']"
                  title="Editar"
                >
                  <font-awesome-icon icon="pen-to-square" class="text-[10px]" />
                </button>
                <button
                  @click="deleteEvent(event.id)"
                  :class="['w-7 h-7 rounded-lg flex items-center justify-center transition-colors cursor-pointer', isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700']"
                  title="Eliminar"
                >
                  <font-awesome-icon icon="trash" class="text-[10px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="py-16 text-center text-slate-400 dark:text-slate-500">
          <font-awesome-icon icon="face-meh" class="text-3xl mb-3 text-slate-400 dark:text-slate-600" />
          <p class="text-sm">No se encontraron eventos registrados con los filtros seleccionados.</p>
        </div>
      </div>

      <!-- Paginación -->
      <div :class="['p-4 border-t flex flex-col sm:flex-row justify-between items-center gap-4 text-xs', isDarkMode ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500']">
        <div class="flex items-center gap-2">
          <span>Mostrando {{ startIndex }} - {{ endIndex }} de {{ filteredEvents.length }}</span>
          <div class="flex items-center gap-1.5 ml-4">
            <span>Filas</span>
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
          <h3 class="text-lg font-bold">{{ isEditingModal ? 'Editar Evento' : 'Registrar Nuevo Evento' }}</h3>
          <button @click="closeModal" class="text-slate-400 hover:text-slate-200 text-lg cursor-pointer">&times;</button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-xs font-medium uppercase tracking-wider mb-2 text-slate-400">Título del Evento</label>
            <input
              type="text"
              v-model="currentEvent.title"
              placeholder="Ej. SHOW EN VIVO"
              :class="['w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800']"
            />
          </div>

          <div>
            <label class="block text-xs font-medium uppercase tracking-wider mb-2 text-slate-400">Estado</label>
            <select
              v-model="currentEvent.status"
              :class="['w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-emerald-500 cursor-pointer', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800']"
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-medium uppercase tracking-wider mb-2 text-slate-400">Imagen del Evento</label>
            <div class="flex items-center gap-4">
              <img :src="currentEvent.imageUrl" class="w-16 h-16 rounded-xl object-cover border border-slate-700" alt="Previsualización" />
              <input
                type="file"
                accept="image/*"
                @change="handleImageChange"
                :class="['w-full border rounded-xl px-3 py-2 text-xs file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer', isDarkMode ? 'bg-[#0b0f19] border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600']"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-4 border-t border-slate-700/50">
          <button @click="closeModal" class="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 cursor-pointer transition-all">Cancelar</button>
          <button @click="saveEvent" class="px-5 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-900/20 cursor-pointer transition-all">Guardar Evento</button>
        </div>
      </div>
    </div>

  </div>
</template>
