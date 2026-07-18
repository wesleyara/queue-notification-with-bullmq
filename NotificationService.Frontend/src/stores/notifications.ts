import { defineStore } from "pinia";
import { computed, ref } from "vue";

import type { NotificationDTO } from "../types/notification";

import { connectSocket, getSocket } from "../services/socket";

export const useNotificationsStore = defineStore("notifications", () => {
  const items = ref<NotificationDTO[]>([]);
  const initialized = ref(false);

  const unreadCount = computed(() => items.value.filter(n => !n.read).length);

  function init(recipient: string) {
    if (initialized.value) return;
    initialized.value = true;

    const socket = connectSocket(recipient);

    socket.on("new-notification", (dto: NotificationDTO) => {
      items.value.unshift(dto);
    });

    socket.on("connect", () => {
      socket.emit(
        "get-notifications",
        { recipient },
        (response: { notifications: NotificationDTO[] }) => {
          items.value = response.notifications;
        },
      );
    });
  }

  function markAllVisibleAsRead(recipient: string) {
    const unreadIds = items.value.filter(n => !n.read).map(n => n.id);
    if (!unreadIds.length) return;

    items.value = items.value.map(n => (unreadIds.includes(n.id) ? { ...n, read: true } : n));
    getSocket()?.emit("mark-as-read", { recipient, ids: unreadIds });
  }

  return { items, unreadCount, init, markAllVisibleAsRead };
});
