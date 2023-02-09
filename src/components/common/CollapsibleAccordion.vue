<template>
  <div class="border-b border-brand-gray-2 py-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      @click="toggle"
    >
      <h3 class="text-base font-semibold">Organization</h3>
      <fa-icon :icon="arrowIcon" />
    </div>

    <div v-if="isOpen" class="mt-5 w-full">Child</div>
  </div>
</template>

<script>
export default {
  name: 'CollapsibleAccordion',
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
  computed: {
    arrowIcon() {
      return this.isOpen ? ['fas', 'angle-up'] : ['fas', 'angle-down'];
    },
  },
};
</script>
