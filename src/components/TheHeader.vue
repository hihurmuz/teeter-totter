<template>
  <header class="the-header">

    <div>
      <v-btn  outlined @click="toggleSimulation">
        <v-icon>{{ isGamePaused ? 'mdi-play' : 'mdi-pause' }}</v-icon>
      </v-btn>
      <v-btn  outlined @click="initGame">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>
    <div class="the-objects-stats">
      <div>
        Total weight:
        <span class="the-objects-stats__weight"> {{ totalstandingObjectsWeight }} kg </span>
      </div>
      <div>
        Momentum:
        <span class="the-objects-stats__weight"> {{ fallingObject[0] && fallingObject[0].weight }} kg </span>
      </div>
    </div>
    <div class="the-objects-stats">
      <div>
        Total weight:
        <span class="the-objects-stats__weight"> {{ totalRandomObjectsWeight }} kg </span>
      </div>
      <div>
        Momentum:
        <span class="the-objects-stats__weight"> {{ randomLastObjectWeight }} kg </span>
      </div>
    </div>

    <div>
      lorem
    </div>
    <refresh-dialog />
  </header>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import RefreshDialog from '@/components/RefreshDialog';

export default {
  components : { RefreshDialog },
  computed: {
    ...mapState(["standingObjects", "fallingObject", "isGamePaused", "isModalShown", "isRandomObjects"]),

    totalstandingObjectsWeight() {
      return this.getTotalWeight(this.standingObjects);
    },

    totalRandomObjectsWeight() {
      return this.getTotalWeight(this.isRandomObjects);
    },
    randomLastObjectWeight(){
      return this.isRandomObjects.length ? this.isRandomObjects.slice(-1)[0].weight : 0
    }
  },
  created() {
    window.addEventListener("keydown", this.handleSpaceClick);
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleSpaceClick);
  },
  methods: {
    ...mapActions(["initGame"]),
    ...mapMutations(["toggleSimulation"]),

    getTotalWeight(objects = []) {
      return objects.reduce((total, current) => (total += current.weight), 0);
    },

    handleSpaceClick(event) {
      event.preventDefault();
      if (event.keyCode === 32 && !this.isModalShown) {
        this.toggleSimulation();
      }
    },
  },
};
</script>
