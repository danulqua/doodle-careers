<template>
  <input
    type="text"
    :value="modelValue"
    class="h-full w-full text-lg font-normal focus:outline-none"
    @input="handleInputChange"
  />
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): string;
}>();

const handleInputChange = ($event: Event) => {
  const target = $event.target as HTMLInputElement;
  emit('update:modelValue', target.value);
};
</script>
