import { defineStore } from 'pinia';

export const LOGIN_USER = 'LOGIN_USER';

export interface UserState {
  isLoggedIn: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoggedIn: false,
  }),
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true;
    },
  },
});
