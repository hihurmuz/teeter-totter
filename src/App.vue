<template>
  <v-app id="app">
    <v-main>
      <TheHeader />
    </v-main>
    <GameArea />
  </v-app>
</template>

<script>
import TheHeader from "./components/TheHeader.vue";
import GameArea from "./components/GameArea.vue";

export default {
  components: {
    TheHeader,
    GameArea,
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/style.scss";
</style>
