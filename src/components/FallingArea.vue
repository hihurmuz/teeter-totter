<template>
  <div class="object-falling-area">
    <TheObject v-for="object in fallingObject" :key="object.id" :objectInfo="object" :id="`the-object-fall-${object.id}`" />
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from "vuex";

import TheObject from "./TheObject.vue";

export default {
  name: "FallingArea",
  components: { TheObject },
  data() {
    return {
      intervalId: null,
      objectBottomLimit: null,
    };
  },
  computed: {
    ...mapGetters(["boardBendingAngle", "isBoardAngleWithinLimits"]),
    ...mapState(["fallingIntervalGap", "fallingObject", "isGamePaused", "settings"]),

    fallingEl() {
      const { id } = this.fallingObject[0];
      return document.getElementById(`the-object-fall-${id}`);
    },
  },
  mounted() {
    const boardEl = document.querySelector(".teeter-totter__board");

    boardEl.addEventListener("transitionend", this.handleBoardTransitionEnd);
    window.addEventListener("keydown", this.moveFalling);

    this.$once("hook:beforeDestroy", () => {
      boardEl.removeEventListener("transitionend", this.handleBoardTransitionEnd);
      window.removeEventListener("keydown", this.moveFalling);
    });
  },
  watch: {
    isGamePaused: {
      handler(current) {
        if (current) {
          clearInterval(this.intervalId);
        } else {
          this.getobjectBottomLimit();
          this.animateObject();
        }
      },
    },
  },
  methods: {
    ...mapMutations([
      "addStandingObject",
      "createObject",
      "moveObject",
      "toggleSimulation",
      "toggleModal",
      "updateFallingIntervalGap",
    ]),

    animateObject() {
      this.intervalId = setInterval(() => {
        if (this.fallingObject[0].top >= this.objectBottomLimit) {
          const droppedEl = this.fallingObject.shift();

          clearInterval(this.intervalId);

          this.addStandingObject(droppedEl);
          this.updateFallingIntervalGap();
          this.createObject();
          this.animateObject();
        } else {
          this.fallingObject[0].top += 1;
          this.fallingEl.style.top = `${this.fallingObject[0].top}px`;
        }
      }, this.fallingIntervalGap);
    },

    getobjectBottomLimit() {
      const boardBounds = document.querySelector(".teeter-totter__board").getBoundingClientRect();
      const panelBounds = document.querySelector(".the-header").getBoundingClientRect();
      const objectBounds = this.fallingEl.getBoundingClientRect();

      // Similarity of triangles
      const totterCathet = boardBounds.bottom - boardBounds.top - this.settings.boardHeight;
      const similarCathet = (this.fallingObject[0].left * totterCathet) / this.settings.boardWidth;

      this.objectBottomLimit =
        this.boardBendingAngle >= 0
          ? boardBounds.top + similarCathet - objectBounds.height - panelBounds.height
          : boardBounds.bottom - similarCathet - objectBounds.height - panelBounds.height;
    },

    handleBoardTransitionEnd() {
      if (this.isGamePaused) return;

      if (this.isBoardAngleWithinLimits) {
        this.getobjectBottomLimit();
      } else {
        this.toggleSimulation();
        this.toggleModal(true);
      }
    },

    moveFalling({ keyCode }) {
      const isArrowKeyPressed = [37, 39].includes(keyCode);

      if (this.isGamePaused || !isArrowKeyPressed) return;

      const objectWidth = this.fallingEl.getBoundingClientRect().width;
      const areaWidth = document.querySelector(".object-falling-area").getBoundingClientRect().width;

      this.moveObject({
        moveLeft: keyCode === 37,
        width: (objectWidth / areaWidth) * 100,
      });

      this.$nextTick(this.getobjectBottomLimit);
    },
  },
};
</script>
