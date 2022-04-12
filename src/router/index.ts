import { createRouter, createWebHistory, useRouter } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import HomeView from "@/views/HomeView.vue";
import SlotView from "@/views/SlotView.vue";

const r = useRouter();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "default-layout",
      component: DefaultLayout,
      redirect: (to) => {
        return "home";
      },
      children: [
        {
          path: "/home",
          name: "home",
          component: HomeView,
        },
        {
          path: "/slot/:id",
          name: "slot",
          component: SlotView,
        },
      ],
    },
  ],
});

export default router;
