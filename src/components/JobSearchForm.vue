<template>
  <form class="flex h-12 items-center rounded-3xl border border-brand-gray-3">
    <fa-icon :icon="['fas', 'search']" class="ml-4 mr-3" />

    <div class="flex h-full flex-1 flex-nowrap text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label class="absolute left-0 -top-10">Role</label>
        <input
          v-model="role"
          type="text"
          placeholder="Software engineer"
          class="w-full text-lg font-normal focus:outline-none"
        />
      </div>

      <span
        class="flex h-full items-center border-x border-brand-gray-3 bg-brand-gray-2 px-3"
      >
        in
      </span>

      <div class="relative flex h-full flex-1 items-center px-3">
        <label class="absolute left-0 -top-10">Where?</label>
        <input
          v-model="location"
          type="text"
          placeholder="Los Angeles"
          class="w-full text-lg font-normal focus:outline-none"
        />
      </div>
    </div>

    <ActionButton text="Search" type="secondary" class="h-full rounded-r-3xl" />
  </form>
</template>

<script>
import ActionButton from '@/components/ActionButton.vue';

export default {
  name: 'JobSearchForm',
  components: { ActionButton },
  data() {
    return {
      role: '',
      location: '',
    };
  },
  methods: {
    updateRole(event) {},
  },
};
</script>
