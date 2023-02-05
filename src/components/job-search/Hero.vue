<template>
  <main>
    <section class="flex h-screen flex-col pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-5 col-start-2">
          <Headline @change="handleActionChange" />
          <JobSearchForm />
        </div>
        <div class="col-span-5 col-start-7 self-center justify-self-center">
          <HeroImages :activeIndex="activeIdx" />
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Headline from '@/components/job-search/Headline.vue';
import JobSearchForm from '@/components/job-search/JobSearchForm.vue';
import HeroImages from '@/components/job-search/HeroImages.vue';

export default {
  name: 'Hero',
  components: { Headline, JobSearchForm, HeroImages },
  data() {
    return {
      activeIdx: 0,
    };
  },
  methods: {
    handleActionChange(actionIdx) {
      this.activeIdx = actionIdx;
    },
  },
};
</script>
