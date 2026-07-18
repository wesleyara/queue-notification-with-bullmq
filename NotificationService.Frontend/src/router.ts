import { createRouter, createWebHistory } from "vue-router";

import { useRecipientStore } from "./stores/recipient";
import HomeView from "./views/HomeView.vue";
import RecipientGateView from "./views/RecipientGateView.vue";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/gate", name: "RecipientGate", component: RecipientGateView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(to => {
  const recipientStore = useRecipientStore();

  if (to.name !== "RecipientGate" && !recipientStore.hasRecipient) {
    return { name: "RecipientGate" };
  }

  if (to.name === "RecipientGate" && recipientStore.hasRecipient) {
    return { name: "Home" };
  }

  return true;
});

export default router;
