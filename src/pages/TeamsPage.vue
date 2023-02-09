<template>
  <HeaderContainer>
    <template #title>
      <h1 class="w-full text-4xl">Teams</h1>
    </template>

    <template #subtitle>
      <h2 slot="subtitle" class="my-4 w-full font-light">
        Together, we create access to information and build products that
        improve people's lives. Want to be a Doodler? Find your role.
      </h2>
    </template>
  </HeaderContainer>
</template>

<script>
import HeaderContainer from '@/components/common/HeaderContainer.vue';

export default {
  name: 'TeamsPage',
  components: { HeaderContainer },
};
</script>
