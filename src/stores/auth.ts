import { defineStore } from 'pinia';

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
        fetch('http://localhost:3005/login', {
          method: 'POST',
          body: JSON.stringify({ user: email, pass: password }),
          headers: { 'Content-type': 'application/json; charset=UTF-8' },
        })
          .then((response) => response.json())
          .then((json) => {
            console.log(json);
            this.authToken = json.access_token;
            this.user = undefined;
            this.pass = undefined;
          })
          .catch((err) => {
            console.log(err);
            window.alert('Invalid credentials');
          });
      }
    },
    async doLogout() {
      fetch('http://localhost:3005/logout', {
        method: 'POST',
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          this.authToken = undefined;
          this.user = undefined;
          this.pass = undefined;
        })
        .catch((err) => {
          console.log(err);
          window.alert('Invalid credentials');
        });
    },
  },
});
