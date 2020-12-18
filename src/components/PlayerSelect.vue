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
      <v-divider></v-divider>
      <v-expansion-panels focusable accordion flat v-model="panelItem">
        <v-expansion-panel
          v-for="(player, index) in sortedPlayers"
          :key="player.player_id"
          :id="player.player_id"
          @click.native.stop=""
        >
          <v-expansion-panel-header
            disable-icon-rotate
            :style="$server.selectedPlayerId == player.player_id ? 'padding:0;background-color:rgba(50, 115, 220, 0.3);' : 'padding:0'"
            @click.native.stop=""
          >
          <v-list-item dense two-line style="padding:0;height:30px;margin-left:9px;" @click.native.stop="panelItem=null;switchSelectedPlayer(player.player_id)">
            <v-list-item-avatar tile>
              <v-icon size="45">{{ player.is_group_player ? 'speaker_group' : 'speaker' }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content style="margin-left:-15px;">
              <v-list-item-title class="subtitle-1">{{ player.name.substring(0,25) }}</v-list-item-title>

              <v-list-item-subtitle
                class="body-2"
                style="font-weight:normal;"
                :key="player.state"
              >
                {{ $t('state.' + player.state) }}
              </v-list-item-subtitle>

            </v-list-item-content>
            </v-list-item>
            <template v-slot:actions>
                <v-btn
                icon
                v-if="panelItem == index"
              >
                <v-icon>mdi-chevron-up</v-icon>
              </v-btn>
              <v-btn
                icon
                v-else
                @click="scrollToTop(player.player_id)"
              >
                <v-flex
                  xs12
                  class="vertical-btn"
                >
                  <v-icon>volume_up</v-icon>
                  <span
                    class="overline"
                    style="margin-top:-4px"
                  >{{ Math.round(player.volume_level) }}</span>
                </v-flex>
              </v-btn>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div
              v-for="childPlayer in getVolumePlayers(player)"
              :key="childPlayer.player_id"
              style="margin-left:-20px;margin-right:-3px;"
            >
              <div
                class="body-2"
                :style="
          !childPlayer.powered
            ? 'color:rgba(0,0,0,.38);'
            : 'color:rgba(0,0,0,.54);'
        "
              >
                <v-btn
                  icon
                  @click="$server.playerCommand('power_toggle', null, childPlayer.player_id)"
                  style="margin-left:8px"
                  :style="
            !childPlayer.powered
              ? 'color:rgba(0,0,0,.38);'
              : 'color:rgba(0,0,0,.54);'
          "
                >
                  <v-icon>power_settings_new</v-icon>
                </v-btn>
                <span
                  class="left"
                  style="margin-left:10px"
                >{{ childPlayer.name.substring(0,25) }}</span>
                <div style="width:100%;margin-top:-8px;margin-left:15px;height:35px;">
                  <div
                    class="caption"
                    style="position:absolute;right:0px;width:35px;margin-top:-18px;text-align: center"
                  >{{ childPlayer.volume_level }}</div>
                  <v-slider
                    lazy
                    :disabled="!childPlayer.powered"
                    :value="Math.round(childPlayer.volume_level)"
                    prepend-icon="volume_down"
                    append-icon="volume_up"
                    @end="$server.playerCommand('volume_set', childPlayer.player_id, $event)"
                    @click:append="$server.playerCommand('volume_up', null, childPlayer.player_id)"
                    @click:prepend="$server.playerCommand('volume_down', null, childPlayer.player_id)"
                  ></v-slider>
                </div>
              </div>
              <v-divider></v-divider>
            </div>
          </v-expansion-panel-content>
          <v-divider></v-divider>
        </v-expansion-panel>
      </v-expansion-panels>
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
import { mapGetters, mapActions } from 'vuex'

export default Vue.extend({
  components: {
  },
  watch: {
    showPlayersMenu (newVal) {
      if (!newVal) {
        this.panelItem = null
      }
    }
  },
  data () {
    return {
      panelItem: null
    }
  },
  computed: {
    ...mapGetters(['getAvailablePlayers', 'getPlayer', 'showPlayersMenu']),
    sortedPlayers: function () {
      return this.getAvailablePlayers
        .slice()
        .sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1))
    }
  },
  created () {},
  methods: {
    ...mapActions(['switchSelectedPlayer']),
    getVolumePlayers (player) {
      var items = []
      for (const groupChildId of player.group_childs) {
        const volumeChild = this.getPlayer(groupChildId)
        if (volumeChild && volumeChild.available) {
          items.push(volumeChild)
        }
      }
      var finalItems = [player]
      items.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1)
      finalItems.push(...items)
      return finalItems
    },
    scrollToTop: function (playerId) {
      setTimeout(() => {
        var elmnt = document.getElementById(playerId)
        elmnt.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    }
  }
})
</script>
