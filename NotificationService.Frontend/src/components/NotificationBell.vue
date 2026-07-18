<script setup lang="ts">
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

import { useNotificationsStore } from "../stores/notifications";
import { useRecipientStore } from "../stores/recipient";
import NotificationPopover from "./NotificationPopover.vue";

const recipientStore = useRecipientStore();
const notificationsStore = useNotificationsStore();

const isOpen = ref(false);
const containerRef = ref<HTMLElement | null>(null);

onClickOutside(containerRef, () => {
  isOpen.value = false;
});

function toggle() {
  isOpen.value = !isOpen.value;

  if (isOpen.value && recipientStore.recipient) {
    notificationsStore.markAllVisibleAsRead(recipientStore.recipient);
  }
}
</script>

<template>
  <div ref="containerRef" class="relative">
    <button
      type="button"
      class="relative rounded-full p-2 text-gray-600 hover:bg-gray-100"
      @click="toggle"
    >
      <VIcon :name="notificationsStore.unreadCount > 0 ? 'bi-bell-fill' : 'bi-bell'" scale="1.1" />
      <span
        v-if="notificationsStore.unreadCount > 0"
        class="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white"
      >
        {{ notificationsStore.unreadCount }}
      </span>
    </button>

    <NotificationPopover v-if="isOpen" :items="notificationsStore.items" />
  </div>
</template>
