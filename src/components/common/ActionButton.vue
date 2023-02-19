<template>
  <button :class="btnStyles">{{ text }}</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ButtonType = 'primary' | 'secondary';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'primary',
    validator(value: ButtonType) {
      return ['primary', 'secondary'].includes(value);
    },
  },
});

const btnStyles = computed(() => ({ [props.type]: true }));
</script>

<style scoped>
button {
  @apply px-5 py-3 text-sm font-medium;
}

.primary {
  @apply rounded bg-brand-blue-1 text-white hover:shadow-blue;
}

.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}
</style>
