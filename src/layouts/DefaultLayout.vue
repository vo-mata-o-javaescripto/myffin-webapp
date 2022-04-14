<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-primary text-white" elevated>
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title @click="goHome">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Global Portfolio
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-page class="q-pa-md">
        <RouterView :key="$route.fullPath" />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
  import { ref, defineComponent } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    setup() {
      const leftDrawerOpen = ref(false);
      const router = useRouter();

      const goHome = () => router.push({ name: 'home' });

      return {
        leftDrawerOpen,
        goHome,
        toggleLeftDrawer() {
          leftDrawerOpen.value = !leftDrawerOpen.value;
        },
      };
    },
  });
</script>
