<template>
  <header class="fixed top-0 left-0 h-16 w-full bg-white">
    <div
      class="flex h-full items-center border-b border-solid border-brand-gray-1 px-8"
    >
      <a href="/" class="flex h-full items-center text-xl text-black">
        danulqua Careers
      </a>
      <nav class="ml-12 h-full">
        <ul class="flex h-full items-center space-x-6">
          <li
            v-for="item in links"
            :key="item.text"
            class="flex h-full items-center"
          >
            <a :href="item.to" class="py-2.5 text-sm">{{ item.text }}</a>
          </li>
        </ul>
      </nav>
      <div class="ml-auto flex h-full items-center">
        <ProfileImage v-if="isLoggedIn" />
        <ActionButton v-else text="Sign in" @click="login" />
      </div>
    </div>
  </header>
</template>

<script>
import ActionButton from '@/components/ActionButton.vue';
import ProfileImage from '@/components/ProfileImage.vue';

export default {
  name: 'MainNav',
  components: { ActionButton, ProfileImage },
  data() {
    return {
      links: [
        {
          text: 'Teams',
          to: '#',
        },
        {
          text: 'Locations',
          to: '#',
        },
        {
          text: 'Life at danulqua Corp',
          to: '#',
        },
        {
          text: 'How we hire',
          to: '#',
        },
        {
          text: 'Students',
          to: '#',
        },
        {
          text: 'Jobs',
          to: '#',
        },
      ],
      isLoggedIn: false,
    };
  },
  methods: {
    login() {
      this.isLoggedIn = true;
    },
  },
};
</script>
