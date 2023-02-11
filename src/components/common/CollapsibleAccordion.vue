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

<script>
export default {
  name: 'CollapsibleAccordion',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  computed: {
    arrowIcon() {
      return this.isOpen ? ['fas', 'angle-up'] : ['fas', 'angle-down'];
    },
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
