<template>
  <section class="mb-16">
    <h1
      class="mb-14 text-8xl font-bold tracking-tighter"
      aria-label="Build for everyone"
    >
      <!-- Visible window -->
      <div class="inline-block h-32 overflow-hidden">
        <!-- Block with items to scroll -->
        <div
          data-testid="scrollableActions"
          class="flex flex-col"
          :class="{ scroll }"
          @transitionend="rearrangeItems"
        >
          <span
            v-for="action in actions"
            :key="action"
            class="flex h-32 items-center"
            :class="action.toLowerCase()"
            role="Action"
            :aria-label="action"
          >
            {{ action }}
          </span>
        </div>
      </div>
      <br />for everyone
    </h1>
    <h2 class="text-light text-3xl">Find your next job at danulqua Corp.</h2>
  </section>
</template>

<script>
import rearrangeListItems from '@/utils/rearrangeListItems';

export default {
  name: 'Headline',
  data() {
    return {
      actions: ['Build', 'Create', 'Design', 'Code'],
      interval: null,
      scroll: false,
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
        this.scroll = true;
      }, 5000);
    },
    rearrangeItems() {
      this.actions = rearrangeListItems(this.actions);
      this.scroll = false;
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

.scroll {
  @apply -translate-y-32 transition-transform duration-500;
}
</style>
