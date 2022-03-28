<template>
  <header class="the-header">

    <div>
      <v-btn class="mr-4" outlined @click="toggleSimulation">
        <v-icon>{{ isGamePaused ? 'mdi-play' : 'mdi-pause' }}</v-icon>
      </v-btn>
      <v-btn  outlined @click="initGame">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </div>

    <div class="d-flex flex-row " v-if="this.$vuetify.breakpoint.width >= 600">
      <div class="the-objects-stats">
        <div>
          {{ $t('totalWeight') }}:
          <span class="the-objects-stats__weight"> {{ totalstandingObjectsWeight }} kg </span>
        </div>
        <div>
          {{ $t('momentum') }}:
          <span class="the-objects-stats__weight"> {{ fallingObject[0] && fallingObject[0].weight }} kg </span>
        </div>
      </div>

      <div class="the-objects-stats">
        <div>
          {{ $t('totalWeight') }}:
          <span class="the-objects-stats__weight"> {{ totalRandomObjectsWeight }} kg </span>
        </div>
        <div>
          {{ $t('momentum') }}:
          <span class="the-objects-stats__weight"> {{ randomLastObjectWeight }} kg </span>
        </div>
      </div>
    </div>


    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          text
          v-bind="attrs"
          v-on="on"
        >
          <v-icon>mdi-translate</v-icon>
          <v-icon>mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in language"
          :key="index"
          @click="changeLanguage(item.symbol)"
        >
          <v-img :src="item.url" width="40" />
          <v-list-item-title class="ml-2">{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <refresh-dialog />
  </header>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
import RefreshDialog from '@/components/RefreshDialog';

export default {
  components : { RefreshDialog },
  data() {
    return {
      language: [
        {
          symbol: 'tr',
          text: 'Türkçe',
          url: 'https://countryflagsapi.com/svg/tr'
        },
        {
          symbol: 'en',
          text: 'English',
          url: 'https://countryflagsapi.com/svg/us'
        }
      ]
    }
  },
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

    changeLanguage(lang) {
      this.$i18n.locale = lang;
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
