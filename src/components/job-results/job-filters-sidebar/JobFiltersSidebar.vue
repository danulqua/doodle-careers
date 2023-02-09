<template>
  <div class="flex w-96 flex-col border-r border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <ActionButton text="Clear filters" type="secondary" />
        </div>
      </div>

      <CollapsibleAccordion title="Organization">
        <div class="mt-5">
          <fieldset>
            <ul class="flex flex-wrap">
              <li class="h-8 w-1/2">
                <input type="checkbox" id="VueTube" class="mr-3" />
                <label for="VueTube">VueTube</label>
              </li>
              <li class="h-8 w-1/2">
                <input type="checkbox" id="VueTube" class="mr-3" />
                <label for="VueTube">VueTube</label>
              </li>
              <li class="h-8 w-1/2">
                <input type="checkbox" id="VueTube" class="mr-3" />
                <label for="VueTube">Halfman is our everything</label>
              </li>
              <li class="h-8 w-1/2">
                <input type="checkbox" id="VueTube" class="mr-3" />
                <label for="VueTube">VueTube</label>
              </li>
              <li class="h-8 w-1/2">
                <input type="checkbox" id="VueTube" class="mr-3" />
                <label for="VueTube">VueTube</label>
              </li>
            </ul>
          </fieldset>
        </div>
      </CollapsibleAccordion>
    </section>
  </div>
</template>

<script>
import ActionButton from '@/components/common/ActionButton.vue';
import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';

export default {
  name: 'JobFiltersSidebar',
  components: { ActionButton, CollapsibleAccordion },
};
</script>
