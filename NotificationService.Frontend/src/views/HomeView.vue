<script setup lang="ts">
import { onMounted } from "vue";

import AppHeader from "../components/AppHeader.vue";
import TestNotificationForm from "../components/TestNotificationForm.vue";
import { useNotificationsStore } from "../stores/notifications";
import { useRecipientStore } from "../stores/recipient";

const recipientStore = useRecipientStore();
const notificationsStore = useNotificationsStore();

onMounted(() => {
  if (recipientStore.recipient) {
    notificationsStore.init(recipientStore.recipient);
  }
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />

    <main class="mx-auto max-w-3xl px-6 py-10">
      <h1 class="text-xl font-semibold text-gray-900">Olá, {{ recipientStore.recipient }}</h1>
      <p class="mt-2 text-sm text-gray-500">
        Suas notificações aparecerão em tempo real no sino no topo da página.
      </p>

      <TestNotificationForm
        v-if="recipientStore.recipient"
        :default-recipient="recipientStore.recipient"
      />
    </main>
  </div>
</template>
