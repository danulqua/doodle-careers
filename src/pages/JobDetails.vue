<template>
  <div>Details for job {{ jobId }}</div>
</template>

<script>
export default {
  name: 'JobDetails',
  computed: {
    jobId() {
      return this.$route.params.id;
    },
  },
};
</script>
