<template>
  <form class="flex h-12 items-center rounded-3xl border border-brand-gray-3">
    <fa-icon :icon="['fas', 'search']" class="mx-4" />

    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="border-bottom relative flex h-full flex-1 items-center">
        <label class="absolute left-0 -top-8">Role</label>
        <TextInput
          v-model="role"
          placeholder="Software engineer"
          class="pr-3"
        />
      </div>

      <span
        class="flex h-full items-center border-x border-brand-gray-3 bg-brand-gray-2 px-3"
      >
        in
      </span>

      <div class="border-bottom relative flex h-full flex-1 items-center">
        <label class="absolute left-3 -top-8">Where?</label>
        <TextInput
          v-model="location"
          placeholder="Software engineer"
          class="pl-3"
        />
      </div>
    </div>

    <ActionButton
      text="Search"
      type="secondary"
      class="relative z-10 h-full rounded-r-3xl transition-colors hover:shadow-blue"
    />
  </form>
</template>

<script>
import ActionButton from '@/components/common/ActionButton.vue';
import TextInput from '@/components/common/TextInput.vue';

export default {
  name: 'JobSearchForm',
  components: { ActionButton, TextInput },
  data() {
    return {
      role: '',
      location: '',
    };
  },
};
</script>

<style>
.border-bottom {
  @apply after:absolute after:bottom-0 after:hidden after:h-[2px] after:w-full after:bg-brand-blue-2 focus-within:after:block hover:after:block;
}
</style>
