<template>
  <CollapsibleAccordion :title="title">
    <div class="mt-5">
      <fieldset>
        <ul class="flex flex-wrap">
          <li
            v-for="value in uniqueValues"
            :key="value"
            class="flex min-h-[32px] w-1/2 items-baseline space-x-2"
          >
            <input
              :id="value"
              v-model="selectedValues"
              type="checkbox"
              :value="value"
              class="cursor-pointer"
              @change="selectValue"
            />
            <label :for="value" class="h-full cursor-pointer pr-4">
              {{ value }}
            </label>
          </li>
        </ul>
      </fieldset>
    </div>
  </CollapsibleAccordion>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  uniqueValues: {
    type: Set<string>,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedValues = ref<string[]>([]);

const router = useRouter();

function selectValue() {
  props.action(selectedValues.value);
  router.push({ name: 'JobsResults' });
}
</script>
