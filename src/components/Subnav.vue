<template>
  <div class="flex h-16 items-center border-b border-brand-gray-1 px-8 text-sm">
    <div v-if="onJobsPage">
      <fa-icon :icon="['fas', 'search']" class="mr-3" />
      <span><span class="text-brand-green-1">2758</span> jobs found</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Subnav',
  data() {
    return {
      onJobsPage: true,
    };
  },
};
</script>
