<template>
  <div>Details for job {{ jobId }}</div>
</template>

<script>
export default {
  name: 'JobDetailsPage',
  computed: {
    jobId() {
      return this.$route.params.id;
    },
  },
};
</script>
