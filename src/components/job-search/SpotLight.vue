<template>
  <ul>
    <li v-for="spotlight in spotlights" :key="spotlight.id">
      <slot
        :img="spotlight.img"
        :title="spotlight.title"
        :description="spotlight.description"
      ></slot>
    </li>
  </ul>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SpotLight',
  data() {
    return {
      spotlights: [],
    };
  },
  mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const url = `${baseUrl}/spotlights`;

    axios.get(url).then((response) => (this.spotlights = response.data));
  },
};
</script>
