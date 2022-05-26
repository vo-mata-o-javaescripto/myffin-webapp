import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomeView from '@/views/HomeView.vue';
import SlotView from '@/views/SlotView.vue';
import LoginView from '@/views/LoginView.vue';
import { useSlotStore } from '@/stores/slot';
import { useWalletStore } from '@/stores/wallet';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default-layout',
      component: DefaultLayout,
      redirect: () => {
        return 'home';
      },
      children: [
        {
          path: '/login',
          name: 'login',
          component: LoginView,
        },
        {
          path: '/home',
          name: 'home',
          component: HomeView,
        },
        {
          path: '/slot/:id?',
          name: 'slot',
          component: SlotView,
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = authStore.isLogged;
  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' });
  } else {
    const slotStore = useSlotStore();
    const walletStore = useWalletStore();

    if (walletStore.all.length <= 0) {
      await Promise.all([slotStore.getAllSlots(), walletStore.getAllWallets()]);
    }

    next();
  }
});

export default router;
