<template>
  <!-- players side menu -->
  <v-navigation-drawer
    right
    app
    clipped
    temporary
    v-model="$store.state.showPlayersMenu"
    width="300"
  >
    <v-card-title class="headline">
      <b>{{ $t('players') }}</b>
    </v-card-title>
    <v-list dense>
      <v-divider></v-divider>
      <div
        v-for="player in getAvailablePlayers"
        :key="player.player_id"
        :style="$server.selectedPlayerId == player.player_id ? 'background-color:rgba(50, 115, 220, 0.3);' : ''"
      >
        <v-list-item
          ripple
          dense
          style="margin-left: -5px; margin-right: -15px"
          @click="switchSelectedPlayer(player.player_id)"
        >
          <v-list-item-avatar tile>
            <v-icon size="45">{{ player.is_group_player ? 'speaker_group' : 'speaker' }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content style="margin-left:-15px;">
            <v-list-item-title class="subtitle-1">{{ player.name }}</v-list-item-title>

            <v-list-item-subtitle
              class="body-2"
              style="font-weight:normal;"
              :key="player.state"
            >
              {{ $t('state.' + player.state) }}
            </v-list-item-subtitle>

          </v-list-item-content>

          <v-list-item-action
            style="padding-right:10px;"
            v-if="$server.selectedPlayerId"
          >
            <v-menu
              :close-on-content-click="false"
              :close-on-click="true"
              :nudge-width="250"
              offset-x
              right
              @click.native.stop
              @click.native.stop.prevent
            >
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  style="color:rgba(0,0,0,.54);"
                  v-on="on"
                >
                  <v-flex
                    xs12
                    class="vertical-btn"
                  >
                    <v-icon>volume_up</v-icon>
                    <span class="overline">{{ Math.round(player.volume_level) }}</span>
                  </v-flex>
                </v-btn>
              </template>
              <VolumeControl
                v-bind:player="player"
              />
            </v-menu>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.vertical-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<script>
import Vue from 'vue'
import VolumeControl from '@/components/VolumeControl.vue'
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  components: {
    VolumeControl
  },
  watch: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters(['getAvailablePlayers', 'getPlayer'])
  },
  created () {
  },
  methods: {
    ...mapActions([
      'switchSelectedPlayer'
    ])
  }
})
</script>
