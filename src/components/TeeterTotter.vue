<template>
  <div class="teeter-totter">
    <div class="teeter-totter__board" :style="boardStyles">
      <TheObject v-for="theObject in standingObjects" :key="theObject.id" :objectInfo="theObject" on-board />

      <TheObject v-for="theObject in isRandomObjects" :key="theObject.id" :objectInfo="theObject" on-board :isRandomCreated="true" />
    </div>

    <div class="teeter-totter__support"></div>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

import TheObject from "./TheObject.vue";

export default {
  name: "TeeterTotter",
  components: { TheObject },
  computed: {
    ...mapGetters(["boardBendingAngle", "isBoardAngleWithinLimits"]),
    ...mapState(["standingObjects", "isRandomObjects"]),

    boardStyles() {
      return {
        transform: `rotate(${this.boardBendingAngle / 2}deg)`,
        height: "10px",
      };
    },

    theObjectsDiff() {
      return this.standingObjects.length - this.isRandomObjects.length;
    },
  },
  watch: {
    theObjectsDiff(current) {
      if (current && this.isBoardAngleWithinLimits) {
        this.createObject(true);
      }
    },
  },
  methods: {
    ...mapMutations(["createObject"]),
  },
};
</script>
