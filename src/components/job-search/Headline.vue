<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="headlineColor">{{ action }}</span>
      <br />for everyone
    </h1>
    <h2 class="text-light text-3xl">Find your next job at danulqua Corp.</h2>
  </section>
</template>

<script>
import nextElementInList from '@/utils/nextElementInList';

export default {
  name: 'Headline',
  data() {
    return {
      action: 'Build',
      actions: ['Build', 'Create', 'Design', 'Code'],
      interval: null,
    };
  },
  created() {
    this.startChangingActions();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  methods: {
    startChangingActions() {
      this.interval = setInterval(() => {
        this.action = nextElementInList(this.actions, this.action);
      }, 5000);
    },
  },
  computed: {
    headlineColor() {
      return {
        [this.action.toLowerCase()]: true,
      };
    },
  },
};
</script>

<style scoped>
.build {
  @apply text-brand-blue-1;
}

.create {
  @apply text-brand-green-1;
}

.design {
  @apply text-brand-yellow-1;
}

.code {
  @apply text-brand-red-1;
}
</style>
