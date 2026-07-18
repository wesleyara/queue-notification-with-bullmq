<script setup lang="ts">
import type { NotificationDTO } from "../types/notification";

defineProps<{ items: NotificationDTO[] }>();

function formatDate(iso: string) {
  return new Date(iso).toLocaleString();
}
</script>

<template>
  <div
    class="absolute right-0 top-full z-10 mt-2 w-80 rounded-lg border border-gray-200 bg-white shadow-lg"
  >
    <div class="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-900">
      Notificações
    </div>

    <div class="max-h-96 overflow-y-auto">
      <p v-if="items.length === 0" class="px-4 py-6 text-center text-sm text-gray-400">
        Nenhuma notificação
      </p>

      <div
        v-for="item in items"
        :key="item.id"
        class="border-b border-gray-50 px-4 py-3 last:border-b-0"
        :class="item.read ? 'bg-white' : 'border-l-2 border-l-blue-500 bg-blue-50'"
      >
        <div class="flex items-center justify-between gap-2">
          <span v-if="item.title" class="text-sm font-medium text-gray-900">{{ item.title }}</span>
          <span
            v-if="!item.read"
            class="rounded-full bg-blue-600 px-2 py-0.5 text-[10px] font-semibold text-white"
          >
            Nova
          </span>
        </div>
        <p class="mt-0.5 text-sm text-gray-600">{{ item.message }}</p>
        <p class="mt-1 text-xs text-gray-400">{{ formatDate(item.createdAt) }}</p>
      </div>
    </div>
  </div>
</template>
