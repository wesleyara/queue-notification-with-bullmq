<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

import { useRecipientStore } from "../stores/recipient";

const recipientStore = useRecipientStore();
const router = useRouter();

const value = ref("");

function submit() {
  const trimmed = value.value.trim();
  if (!trimmed) return;

  recipientStore.setRecipient(trimmed);
  router.push("/");
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <form
      class="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
      @submit.prevent="submit"
    >
      <h1 class="mb-1 text-lg font-semibold text-gray-900">Bem-vindo</h1>
      <p class="mb-4 text-sm text-gray-500">
        Informe seu identificador para receber suas notificações.
      </p>

      <input
        v-model="value"
        type="text"
        placeholder="voce@exemplo.com"
        class="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
      />

      <button
        type="submit"
        class="w-full rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Entrar
      </button>
    </form>
  </div>
</template>
