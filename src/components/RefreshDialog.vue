<template>
  <v-dialog
    v-model="isModalShown"
    width="500"
  >
    <v-card>
      <v-card-title class="text-h5 grey lighten-2">
        Teeter Totter Game
      </v-card-title>

      <v-img src="https://cdn4.iconfinder.com/data/icons/carnival-vol-3/48/116-512.png"></v-img>

       <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          color="primary"
          text
          @click="initGame"
        >
          {{ $t('refreshTheGame') }}:
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name : 'RefreshDialog',
  data(){
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState(["isModalShown"]),
  },
  methods: {
    ...mapActions(["initGame"]),
  },
};
</script>
