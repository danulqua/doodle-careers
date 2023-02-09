<template>
  <CollapsibleAccordion title="Organizations">
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
</template>

<script>
import CollapsibleAccordion from '@/components/common/CollapsibleAccordion.vue';

export default {
  name: 'JobFiltersSidebarOrganizations',
  components: { CollapsibleAccordion },
};
</script>
