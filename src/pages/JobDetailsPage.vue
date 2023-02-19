<template>
  <div>Details for job {{ jobId }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const jobId = computed(() => route.params.id);
</script>
