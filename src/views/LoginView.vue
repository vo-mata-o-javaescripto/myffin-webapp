<template>
  <div class="row q-gutter-xs">
    <div class="col col-12">
      <h4>Faça login</h4>
    </div>

    <div class="col col-12">
      <form @submit.prevent="submit">
        <label for="user"></label>
        <input name="user" type="text" v-model="authStore.user" />

        <label for="pass"></label>
        <input name="pass" type="text" v-model="authStore.pass" />

        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const authStore = useAuthStore();

  const submit = async () => {
    await authStore.doLogin();

    if (authStore.isLogged) {
      router.push({ name: 'home' });
    }
  };
</script>
