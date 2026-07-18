<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{ defaultRecipient: string }>();

const recipient = ref(props.defaultRecipient);
const fileUrl = ref("https://example.com/documento.pdf");
const processingTimeSeconds = ref(3);
const status = ref<"error" | "idle" | "sending" | "sent">("idle");

async function submit() {
  if (!recipient.value.trim() || !fileUrl.value.trim()) return;

  status.value = "sending";

  try {
    const url = new URL("/ocr", import.meta.env.VITE_OCR_PROVIDER_URL);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file_url: fileUrl.value.trim(),
        recipient: recipient.value.trim(),
        processing_time_seconds: processingTimeSeconds.value,
      }),
    });

    if (!response.ok) throw new Error("Request failed");

    status.value = "sent";
  } catch {
    status.value = "error";
  }
}
</script>

<template>
  <form
    class="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    @submit.prevent="submit"
  >
    <h2 class="mb-1 text-sm font-semibold text-gray-900">Testar notificação</h2>
    <p class="mb-4 text-sm text-gray-500">
      Dispara um job de OCR no OcrProviderService. As notificações do processamento ("OCR iniciado",
      "em andamento", "concluído") chegarão no sino em tempo real.
    </p>

    <label class="mb-1 block text-xs font-medium text-gray-600">Destinatário</label>
    <input
      v-model="recipient"
      type="text"
      class="mb-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
    />

    <label class="mb-1 block text-xs font-medium text-gray-600">URL do arquivo</label>
    <input
      v-model="fileUrl"
      type="text"
      placeholder="https://example.com/documento.pdf"
      class="mb-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
    />

    <label class="mb-1 block text-xs font-medium text-gray-600">
      Tempo de processamento (segundos)
    </label>
    <input
      v-model.number="processingTimeSeconds"
      type="number"
      min="1"
      step="1"
      class="mb-4 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
    />

    <button
      type="submit"
      class="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      :disabled="status === 'sending'"
    >
      {{ status === "sending" ? "Enviando..." : "Disparar OCR" }}
    </button>

    <p v-if="status === 'sent'" class="mt-2 text-sm text-green-600">Job de OCR enfileirado!</p>
    <p v-if="status === 'error'" class="mt-2 text-sm text-red-600">
      Falha ao enviar. Verifique se o OcrProviderService está rodando.
    </p>
  </form>
</template>
