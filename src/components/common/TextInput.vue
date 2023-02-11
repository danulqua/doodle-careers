<template>
  <input
    type="text"
    :value="modelValue"
    class="h-full w-full text-lg font-normal focus:outline-none"
    @input="handleInputChange"
  />
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    handleInputChange($event) {
      this.$emit('update:modelValue', $event.target.value);
    },
  },
};
</script>
