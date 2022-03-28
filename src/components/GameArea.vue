<template>
  <main class="game-area">
    <falling-area />
    <teeter-totter />
  </main>
</template>

<script>
import { mapActions } from 'vuex';

import FallingArea from './FallingArea.vue';
import TeeterTotter from './TeeterTotter.vue';

export default {
  components : {
    FallingArea,
    TeeterTotter
  },
  created() {
    this.initGame();
  },
  methods : {
    ...mapActions(['initGame'])
  }
};
</script>
