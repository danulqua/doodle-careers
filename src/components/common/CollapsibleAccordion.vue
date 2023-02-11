<template>
  <div class="border-b border-brand-gray-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      role="button"
      @click="toggle"
    >
      <h3 class="text-base font-semibold">{{ title }}</h3>
      <fa-icon :icon="arrowIcon" />
    </div>

    <div v-if="isOpen" class="mt-5 w-full">
      <slot>
        <p>Fallback for accordion content</p>
      </slot>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}

const arrowIcon = computed(() =>
  isOpen.value ? ['fas', 'angle-up'] : ['fas', 'angle-down']
);
</script>
