<template>
  <main>
    <section class="flex h-screen flex-col pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-5 col-start-2">
          <Headline />
          <JobSearchForm />
        </div>
        <div class="col-span-5 col-start-7"></div>
      </div>
    </section>
  </main>
</template>

<script>
import Headline from '@/components/Headline.vue';
import JobSearchForm from '@/components/JobSearchForm.vue';

export default {
  name: 'Hero',
  components: { Headline, JobSearchForm },
};
</script>
