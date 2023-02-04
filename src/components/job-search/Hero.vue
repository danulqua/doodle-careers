<template>
  <main>
    <section class="flex h-screen flex-col pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-5 col-start-2">
          <Headline />
          <JobSearchForm />
        </div>
        <div class="col-span-5 col-start-7 self-center justify-self-center">
          <img
            src="@/assets/images/hero-build.png"
            alt="Build hero image"
            class="h-96 w-96 object-contain"
          />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Headline from '@/components/job-search/Headline.vue';
import JobSearchForm from '@/components/job-search/JobSearchForm.vue';

export default {
  name: 'Hero',
  components: { Headline, JobSearchForm },
};
</script>
