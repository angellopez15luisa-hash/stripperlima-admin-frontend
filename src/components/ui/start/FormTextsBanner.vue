<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
const title = defineModel<string>('title') // o titleStart
const description = defineModel<string>('description') // o descriptionStart

// Recibimos los errores y la prop disabled del padre
defineProps<{
  errors: Record<string, string | undefined>
  disabled: boolean
}>()
</script>

<template>
  <!-- TEXTOS GLOBALES -->
  <div
    class="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-4"
  >
    <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
      <font-awesome-icon icon="heading" class="text-emerald-500" />
      Textos Globales del Banner
    </h2>
    <div class="space-y-3">
      <div>
        <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1"
          >Título Principal</label
        >
        <input
          v-model="title"
          type="text"
          :disabled="disabled"
          class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <span v-if="errors?.titleStart" class="text-red-500 text-sm">
          {{ errors.titleStart }}
        </span>
      </div>
      <div>
        <label class="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1"
          >Descripción / Texto Largo</label
        >
        <textarea
          v-model="description"
          rows="2"
          :disabled="disabled"
          class="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition resize-none disabled:opacity-50 disabled:cursor-not-allowed"
        ></textarea>
        <span v-if="errors?.descriptionStart" class="text-red-500 text-sm">
          {{ errors.descriptionStart }}
        </span>
      </div>
    </div>
  </div>
</template>
