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
    <h2 class="text-light text-3xl">Find your next job at Doodle.</h2>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

import rearrangeListItems from '@/utils/rearrangeListItems';

const actions = ref(['Build', 'Create', 'Design', 'Code']);
const activeIdx = ref(0);
const interval = ref<ReturnType<typeof setInterval>>();
const scroll = ref(false);

const startChangingActions = () => {
  interval.value = setInterval(() => {
    scroll.value = true;
  }, 4000);
};

onMounted(startChangingActions);
onBeforeUnmount(() => clearInterval(interval.value!));

const emit = defineEmits<{ (event: 'change', index: number): number }>();
const rearrangeItems = () => {
  actions.value = rearrangeListItems(actions.value);
  activeIdx.value = (activeIdx.value + 1) % actions.value.length;
  scroll.value = false;
  emit('change', activeIdx.value);
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
