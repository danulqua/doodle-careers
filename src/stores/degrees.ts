import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Degree } from '@/api/types';
import getDegrees from '@/api/getDegrees';

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([]);

  const FETCH_DEGREES = async () => {
    const data = await getDegrees();
    degrees.value = data;
  };

  const UNIQUE_DEGREES = computed(
    () => new Set(degrees.value.map((item) => item.degree))
  );

  return { degrees, FETCH_DEGREES, UNIQUE_DEGREES };
});
