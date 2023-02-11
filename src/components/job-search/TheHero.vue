<template>
  <main class="flex h-screen flex-col">
    <section class="pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-5 col-start-2">
          <Headline @change="handleActionChange" />
          <JobSearchForm />
        </div>
        <div class="col-span-5 col-start-7 self-center justify-self-center">
          <HeroImages :active-index="activeIdx" />
        </div>
      </div>
    </section>

    <SpotLight class="flex justify-center pb-16">
      <template #default="{ img, title, description }">
        <RouterLink
          to="/jobs/results"
          class="mx-5 flex h-96 w-72 flex-col overflow-hidden rounded-lg border bg-brand-gray-2"
        >
          <img :src="img" :alt="title" class="object-contain" />
          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="text-lg font-medium">
              {{ title }}
            </h3>

            <p class="mt-3 text-sm">
              {{ description }}
            </p>
          </div>
          <RouterLink
            to="/jobs/results"
            class="px-6 pb-4 text-sm text-brand-blue-1"
          >
            See jobs
          </RouterLink>
        </RouterLink>
      </template>
    </SpotLight>
  </main>
</template>

<script>
import Headline from '@/components/job-search/TheHeadline.vue';
import JobSearchForm from '@/components/job-search/JobSearchForm.vue';
import HeroImages from '@/components/job-search/HeroImages.vue';
import SpotLight from '@/components/job-search/SpotLight.vue';

export default {
  name: 'TheHero',
  components: { Headline, JobSearchForm, HeroImages, SpotLight },
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
