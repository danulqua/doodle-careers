<template>
  <img
    :src="imageLink"
    alt="User profile image"
    class="h-9 w-9 rounded-3xl object-cover"
  />
</template>

<script>
export default {
  name: 'ProfileImage',
  data() {
    return {
      imageLink: 'https://i.ytimg.com/vi/B-S9RZ1o1S4/maxresdefault.jpg',
    };
  },
};
</script>
