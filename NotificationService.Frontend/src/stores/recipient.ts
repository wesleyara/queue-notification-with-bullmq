import { defineStore } from "pinia";
import { computed, ref } from "vue";

const STORAGE_KEY = "recipient";

export const useRecipientStore = defineStore("recipient", () => {
  const recipient = ref<null | string>(localStorage.getItem(STORAGE_KEY));

  const hasRecipient = computed(() => !!recipient.value);

  function setRecipient(value: string) {
    recipient.value = value;
    localStorage.setItem(STORAGE_KEY, value);
  }

  function clearRecipient() {
    recipient.value = null;
    localStorage.removeItem(STORAGE_KEY);
  }

  return { recipient, hasRecipient, setRecipient, clearRecipient };
});
