<template>
  <v-card style="position:fixed;width:300px;right:20px;bottom:20px">
    <v-list style="overflow: hidden;">
    <v-list-item style="height:50px;padding-bottom:5;">
      <v-list-item-avatar tile style="margin-left:-10px;">
        <v-icon large>{{
          player.is_group_player ? "speaker_group" : "speaker"
        }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content style="margin-left:-15px;">
        <v-list-item-title>{{ player.name }}</v-list-item-title>
        <v-list-item-subtitle>{{
          $t("state." + player.state)
        }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <div v-for="childPlayer in volumePlayers" :key="childPlayer.player_id">
      <div
        class="body-2"
        :style="!childPlayer.powered ? 'color:grey;' : ''"
      >
        <v-btn
          icon
          @click="$server.playerCommand('power_toggle', null, childPlayer.player_id)"
          style="margin-left:8px"
          :style="!childPlayer.powered ? 'color:grey;' : ''"
        >
          <v-icon>power_settings_new</v-icon>
        </v-btn>
        <span class="left" style="margin-left:10px">{{ childPlayer.name }}</span>
        <div
          style="margin-top:-8px;margin-left:15px;margin-right:15px;height:35px;"
        >
        <div class="caption" style="position:absolute;right:10px;width:35px;margin-top:-18px;text-align: center">{{ childPlayer.volume_level }}</div>
          <v-slider
            lazy
            :disabled="!childPlayer.powered"
            :value="Math.round(childPlayer.volume_level)"
            prepend-icon="volume_down"
            append-icon="volume_up"
            @end="$server.playerCommand('volume_set', $event, childPlayer.playerId)"
            @click:append="$server.playerCommand('volume_up', null, childPlayer.player_id)"
            @click:prepend="s$server.playerCommand('volume_down', null, childPlayer.player_id)"
          ></v-slider>
        </div>
      </div>
      <v-divider></v-divider>
    </div>
    </v-list>
  </v-card>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  props: ['player'],
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['getAvailablePlayers', 'getPlayer']),
    volumePlayers () {
      var items = []
      for (const groupChildId of this.player.group_childs) {
        const volumeChild = this.getPlayer(groupChildId)
        if (volumeChild && volumeChild.available) {
          items.push(volumeChild)
        }
      }
      var finalItems = [this.player]
      items.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : -1)
      finalItems.push(...items)
      return finalItems
    }
  },
  mounted () { },
  methods: {
  }
})
</script>
