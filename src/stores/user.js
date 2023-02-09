import { defineStore } from 'pinia';

export const LOGIN_USER = 'LOGIN_USER';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true;
    },
  },
});
