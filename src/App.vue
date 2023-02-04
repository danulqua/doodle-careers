<template>
  <MainNav />
  <Hero />
</template>

<script>
import MainNav from '@/components/navigation/MainNav.vue';
import Hero from '@/components/job-search/Hero.vue';

export default {
  name: 'App',
  components: {
    MainNav,
    Hero,
  },
};
</script>
