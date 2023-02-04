<template>
  <main>
    <section class="flex h-screen flex-col bg-red-500 pt-10 pb-20">
      <div class="grid grid-cols-12">
        <div class="col-span-5 col-start-2 border border-black">
          <Headline />
        </div>
        <div class="col-span-5 col-start-7 border border-black">Column 2</div>
      </div>
    </section>
  </main>
</template>

<script>
import Headline from '@/components/Headline.vue';

export default {
  name: 'Hero',
  components: { Headline },
};
</script>
