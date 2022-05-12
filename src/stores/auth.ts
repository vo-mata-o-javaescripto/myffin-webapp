import { Directus } from '@directus/sdk';
import { defineStore } from 'pinia';
const directus = new Directus('http://localhost:8055');

export type RootState = {
  user: string | undefined;
  pass: string | undefined;
  authToken: string | undefined;
};

export const useAuthStore = defineStore({
  id: 'auth',
  // persist: true,
  persist: {
    key: 'pinia.auth',
    // storage: window.sessionStorage,
    paths: ['authToken'],
    beforeRestore: (context) => {
      console.log('Before hydration...');
    },
    afterRestore: (context) => {
      console.log('After hydration...');
    },
  },
  state: () =>
    ({
      user: undefined,
      pass: undefined,
      authToken: undefined,
    } as RootState),
  getters: {
    isLogged: (state) => {
      return !!state.authToken;
    },
  },
  actions: {
    async doLogin() {
      const email = this.user;
      const password = this.pass;

      if (email !== undefined && password !== undefined) {
        try {
          const res: any = await directus.auth.login({ email, password });
          this.authToken = res.access_token;
          this.user = undefined;
          this.pass = undefined;
        } catch (err) {
          window.alert('Invalid credentials');
        }
      }
    },
    async doLogout() {
      try {
        await directus.auth.logout();
        this.authToken = undefined;
        this.user = undefined;
        this.pass = undefined;
      } catch (err) {
        window.alert('Logout failed');
      }
    },
  },
});
