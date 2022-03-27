import Vue from "vue";
import Vuex from "vuex";

import helpers from "@/plugins/helpers";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    standingObjects: [],
    fallingObject: [],
    isRandomObjects: [],
    isGamePaused: true,
    isModalShown: false,
    fallingIntervalGap: null,
    settings: {
      maxBendingAngle: 30,
      minBendingAngle: -30,
      maxWeight: 10,
      minWeight: 1,
      scaleStep: 0.08,
      maxFallingIntervalGap: 10,
      minFallingIntervalGap: 5,
      boardHeight: 10,
      boardWidth: 100,
    },
  },
  mutations: {
    addStandingObject(state, theObject = {}) {
      state.standingObjects.push(theObject);
    },
    resetStore(state) {
      state.standingObjects = [];
      state.fallingObject = [];
      state.isRandomObjects = [];
    },
    toggleSimulation(state) {
      state.isGamePaused = !state.isGamePaused;
    },
    createObject({ isRandomObjects, fallingObject, settings }, isRandomCreated = false) {
      const weight = helpers.randomNumber(settings.minWeight, settings.maxWeight - 1);
      const type = helpers.randomNumber(1, 2);
      const left = helpers.randomNumber(0, 40);
      const color = helpers.colorGenerate();
      const top = 0;
      const scale = 1 + settings.scaleStep * (weight - 1);
      const id = helpers.getId.next().value;
      const theObject = { id, color, left, scale, top, type, weight };

      if (isRandomCreated) {
        isRandomObjects.push(theObject);
      } else {
        fallingObject.push(theObject);
      }
    },
    moveObject({ fallingObject }, { moveLeft, width }) {
      const [theObject] = fallingObject;

      const canMoveLeft = theObject.left - 1 >= 0;
      const canMoveRight = theObject.left + width + 1 <= 45;

      if (moveLeft) {
        canMoveLeft && theObject.left--;
      } else {
        canMoveRight && theObject.left++;
      }
    },
    toggleModal(state, isShown = false) {
      state.isModalShown = isShown;
    },
    updateFallingIntervalGap(state, reset = false) {
      if (reset) {
        state.fallingIntervalGap = state.settings.maxFallingIntervalGap;
      } else if (state.fallingIntervalGap > state.settings.minFallingIntervalGap) {
        state.fallingIntervalGap--;
      }
    },
  },
  actions: {
    initGame({ commit, state }) {
      if (!state.isGamePaused) commit("toggleSimulation");
      if (state.isModalShown) commit("toggleModal");
      commit("updateFallingIntervalGap", true);
      commit("resetStore");
      commit("createObject");
      commit("createObject");
      commit("createObject", true);
    },
  },
  getters: {
    boardBendingAngle(state, { standingObjectWeightTotal, isRandomObjectWeight }) {
      let angle = 0;

      if (!standingObjectWeightTotal) {
        angle = state.settings.maxBendingAngle;
      } else {
        const subtraction = Math.abs(standingObjectWeightTotal - isRandomObjectWeight);

        angle =
          standingObjectWeightTotal > isRandomObjectWeight
            ? (subtraction / standingObjectWeightTotal) * -50
            : (subtraction / isRandomObjectWeight) * 50;
      }

      return angle;
    },

    standingObjectWeightTotal({ standingObjects }) {
      return helpers.getObjectCurrentStatus(standingObjects, true);
    },

    isBoardAngleWithinLimits(state, { boardBendingAngle }) {
      return boardBendingAngle > state.settings.minBendingAngle && boardBendingAngle < state.settings.maxBendingAngle;
    },

    isRandomObjectWeight({ isRandomObjects }) {
      return helpers.getObjectCurrentStatus(isRandomObjects);
    },
  },
});
