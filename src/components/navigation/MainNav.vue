<template>
  <header class="sticky top-0 left-0 z-10 w-full bg-white">
    <div
      class="flex h-16 items-center border-b border-solid border-brand-gray-1 px-8"
    >
      <router-link
        :to="{ name: 'Home' }"
        class="flex h-full items-center text-xl text-black"
      >
        Doodle Careers
      </router-link>
      <nav class="ml-12 h-full">
        <ul class="flex h-full items-center space-x-6">
          <li
            v-for="item in links"
            :key="item.text"
            class="flex h-full items-center"
          >
            <router-link :to="item.to" class="py-2.5 text-sm">{{
              item.text
            }}</router-link>
          </li>
        </ul>
      </nav>
      <div class="ml-auto flex h-full items-center">
        <ProfileImage v-if="userStore.isLoggedIn" />
        <ActionButton v-else text="Sign in" @click="userStore.LOGIN_USER" />
      </div>
    </div>
    <SubNav v-if="userStore.isLoggedIn" />
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';

import ActionButton from '@/components/common/ActionButton.vue';
import ProfileImage from '@/components/navigation/ProfileImage.vue';
import SubNav from '@/components/navigation/SubNav.vue';

const links = [
  {
    text: 'Teams',
    to: '/teams',
  },
  {
    text: 'Locations',
    to: '/',
  },
  {
    text: 'Life at danulqua Corp',
    to: '/',
  },
  {
    text: 'How we hire',
    to: '/',
  },
  {
    text: 'Students',
    to: '/',
  },
  {
    text: 'Jobs',
    to: '/jobs/results',
  },
];

const userStore = useUserStore();
</script>
