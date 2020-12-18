<template>
  <v-footer
    app
    fixed
    padless
    :height="$store.state.isInStandaloneMode ? '180' : '150'"
    :style="$vuetify.theme.dark ? 'box-shadow: 0px 5px 3px 6px rgba(180, 180, 180, 0.75);' : 'box-shadow: 0px 5px 3px 7px rgba(30, 30, 30, 0.75);'"
  >
    <v-img
        class="bg-image"
        :height="$store.state.isInStandaloneMode ? '180' : '150'"
        width="100%"
        position="center"
        :src="getFanart(curQueueItem)"
        :gradient="$vuetify.theme.dark ? 'to bottom, rgba(0,0,0,.80), rgba(0,0,0,.75)' : 'to bottom, rgba(255,255,255,.80), rgba(255,255,255,.75)'"
        style="position:absolute;margin-left-20px;margin-right:-20px"
      />
      <!-- now playing media -->
      <v-list-item two-line>
        <v-list-item-avatar
          tile
          v-if="curQueueItem"
        >
          <MediaItemThumb
            :item="curQueueItem"
            :key="curQueueItem.item_id"
            :size="80"
            style="margin-left: 0px;border: 1px solid rgba(0,0,0,.54);"
          />
        </v-list-item-avatar>
        <v-list-item-avatar v-else>
          <v-icon>speaker</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-if="curQueueItem">
            {{ curQueueItem.name }}</v-list-item-title>
          <v-list-item-title v-else-if="getSelectedPlayer">
            {{ getSelectedPlayer.name }}</v-list-item-title>
          <v-list-item-subtitle
            v-if="curQueueItem"
            style="color: primary"
          >
            <span
              v-for="(artist, artistindex) in curQueueItem.artists"
              :key="artistindex"
            >
              <a
                v-on:click="artistClick(artist)"
                @click.stop=""
              >{{
                artist.name
              }}</a>
              <label
                v-if="artistindex + 1 < curQueueItem.artists.length"
                :key="artistindex"
              >
                /
              </label>
            </span>
          </v-list-item-subtitle>
        </v-list-item-content>
        <!-- streaming quality details -->
        <v-list-item-action v-if="streamDetails">
          <v-menu
            :close-on-content-click="false"
            :nudge-width="250"
            offset-x
            top
            @click.native.prevent
          >
            <template v-slot:activator="{ on }">
              <v-btn
                icon
                v-on="on"
                style="margin-right:-10px;margin-top:-20px"
                x-small
              >
                <v-img
                  contain
                  v-if="streamDetails.bit_depth > 16"
                  :src="require('../assets/hires.png')"
                  height="25"
                />
                <v-img
                  contain
                  v-if="streamDetails.bit_depth <= 16"
                  :src="streamDetails.content_type ? require('../assets/' + streamDetails.content_type + '.png') : ''"
                  height="25"
                  :style="!$vuetify.theme.dark ? 'filter: invert(100%);margin-right:10px' : 'margin-right:10px'"
                />
              </v-btn>
            </template>
            <v-list v-if="streamDetails">
              <v-subheader class="title">{{ $t('stream_details') }}</v-subheader>
              <v-list-item
                tile
                dense
              >
                <v-list-item-icon>
                  <v-img
                    max-width="50"
                    contain
                    :src="getProviderIcon(streamDetails.provider)"
                  />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title style="text-transform: capitalize;">{{ streamDetails.provider }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item
                tile
                dense
              >
                <v-list-item-icon>
                  <v-img
                    max-width="50"
                    contain
                    :src="streamDetails.content_type ? require('../assets/' + streamDetails.content_type + '.png') : ''"
                    :style="$vuetify.theme.dark ? 'filter: invert(100%);' : ''"
                  />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>{{ streamDetails.sample_rate/1000 }} kHz / {{ streamDetails.bit_depth }} bits </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <div v-if="getSelectedPlayerQueue && getSelectedPlayerQueue.crossfade_enabled">
                <v-list-item
                  tile
                  dense
                >
                  <v-list-item-icon>
                    <v-img
                      max-width="50"
                      contain
                      :src="require('../assets/crossfade.png')"
                    />
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title>{{ $t('crossfade_enabled') }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </div>
              <div v-if="streamDetails.gain_correct">
                <v-list-item
                  tile
                  dense
                >
                  <v-list-item-icon>
                    <v-icon
                      style="margin-left:13px"
                    >volume_up</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title style="margin-left:12px">{{ streamDetails.gain_correct }} dB</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
              </div>
            </v-list>
          </v-menu>
        </v-list-item-action>
      </v-list-item>

      <!-- progress bar and time details -->
      <span v-if="!$store.state.isMobile" class="right caption" style="color:grey;margin-right:15px;margin-top:-30px">{{ playerCurTimeStr }} / {{ playerTotalTimeStr }}</span>
      <div :style="`height:10px;margin-left:15px;margin-right:15px;width:${progressBarWidth}px;`">
        <v-progress-linear
          :value="progress"
          height="3"
          :style="'width:' + progressBarWidth + 'px;'"
        />
      </div>

      <!-- Control buttons -->
    <v-list-item
      dense
      style="height:62px;margin-bottom:5px;margin-top:-4px;background-color:transparent;"
    >
      <v-list-item-action
        v-if="getSelectedPlayer"
        style="margin-top:15px"
      >
        <v-btn
          small
          icon
          @click="playerCommand('previous')"
        >
          <v-icon>skip_previous</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action
        v-if="getSelectedPlayer"
        style="margin-left:-32px;margin-top:15px"
      >
        <v-btn
          icon
          x-large
          @click="playerCommand('play_pause')"
        >
          <v-icon size="50">{{
              getSelectedPlayer.state == "playing" ? "pause" : "play_arrow"
            }}</v-icon>
        </v-btn>
      </v-list-item-action>
      <v-list-item-action
        v-if="getSelectedPlayer"
        style="margin-top:15px"
      >
        <v-btn
          icon
          small
          @click="playerCommand('next')"
        >
          <v-icon>skip_next</v-icon>
        </v-btn>
      </v-list-item-action>
      <!-- player controls -->
      <v-list-item-content> </v-list-item-content>

      <!-- active player queue button -->
      <v-list-item-action
        style="padding:16px;"
        v-if="getSelectedPlayer"
      >
        <v-btn
          text
          icon
          @click="$router.push('/playerqueue/')"
        >
          <v-flex
            xs12
            class="vertical-btn"
          >
            <v-icon>queue_music</v-icon>
            <span
              class="caption"
              style="padding-top: 5px"
            >{{ $t("queue") }}</span>
          </v-flex>
        </v-btn>
      </v-list-item-action>

      <!-- active player volume -->
      <v-list-item-action
        style="padding-left:25px;"
        v-if="getSelectedPlayer && !$store.state.isMobile"
      >
        <v-dialog :transition="false" overlay-opacity="0.1"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              v-bind="attrs"
              v-on="on"
            >
              <v-flex
                xs12
                class="vertical-btn"
              >
                <v-icon>volume_up</v-icon>
                <span
                  class="caption"
                  style="padding-top: 5px"
                >{{
                    Math.round(getSelectedPlayer.volume_level)
                  }}</span>
              </v-flex>
            </v-btn>
          </template>
          <VolumeControl v-bind:player="getSelectedPlayer" />
        </v-dialog>
      </v-list-item-action>

      <!-- active player btn -->
      <v-list-item-action style="padding-left:25px;margin-right:15px">
        <v-btn
          text
          icon
          @click="$store.state.showPlayersMenu = true"
        >
          <v-flex
            xs12
            class="vertical-btn"
          >
            <v-icon>speaker</v-icon>
            <span
              class="caption"
              v-if="getSelectedPlayer"
              style="padding-top: 5px"
            >{{
                truncateString(getSelectedPlayer.name, 12)
              }}</span>
            <span
              class="caption"
              v-else
            > </span>
          </v-flex>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-footer>
</template>

<style scoped>
.vertical-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.right {
  float: right;
}
.left {
  float: left;
}
.bg-image {
  /* Add the blur effect */
  filter: blur(20px);
  -webkit-filter: blur(20px);
  /* Center and scale the image nicely */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

<script>
import Vue from 'vue'
import VolumeControl from '@/components/VolumeControl.vue'
import MediaItemThumb from '@/components/MediaItemThumb.vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  components: {
    VolumeControl,
    MediaItemThumb
  },
  props: [],
  data () {
    return {
    }
  },
  watch: {},
  computed: {
    ...mapGetters([
      'selectedPlayer',
      'getSelectedPlayerQueue',
      'getSelectedPlayerId',
      'getSelectedPlayer',
      'getPlayers',
      'getProviderIcon'
    ]),
    curQueueItem () {
      if (this.getSelectedPlayerQueue) {
        return this.getSelectedPlayerQueue.cur_item
      } else {
        return null
      }
    },
    progress () {
      if (!this.curQueueItem) return 0
      var totalSecs = this.curQueueItem.duration
      var curSecs = this.getSelectedPlayerQueue.cur_item_time
      var curPercent = (curSecs / totalSecs) * 100
      return curPercent
    },
    playerCurTimeStr () {
      if (!this.curQueueItem) return '0:00'
      var curSecs = this.getSelectedPlayerQueue.cur_item_time
      return curSecs.toString().formatDuration()
    },
    playerTotalTimeStr () {
      if (!this.curQueueItem) return '0:00'
      var totalSecs = this.curQueueItem.duration
      return totalSecs.toString().formatDuration()
    },
    progressBarWidth () {
      return window.innerWidth - 45
    },
    streamDetails () {
      if (
        !this.getSelectedPlayerQueue ||
        !this.getSelectedPlayerQueue.cur_item ||
        !this.getSelectedPlayerQueue.cur_item ||
        !this.getSelectedPlayerQueue.cur_item.streamdetails ||
        !this.getSelectedPlayerQueue.cur_item.streamdetails.provider ||
        !this.getSelectedPlayerQueue.cur_item.streamdetails.content_type
      ) {
        return {}
      }
      return this.getSelectedPlayerQueue.cur_item.streamdetails
    }
  },
  created () {},
  methods: {
    playerCommand (cmd, cmd_opt = null) {
      this.$server.playerCommand(cmd, cmd_opt, this.$store.selectedPlayerId)
    },
    artistClick (item) {
      // artist entry clicked within the listviewItem
      var url = '/artists/' + item.item_id
      this.$router.push({ path: url, query: { provider: item.provider } })
    },
    truncateString (str, num) {
      // If the length of str is less than or equal to num
      // just return str--don't truncate it.
      if (str.length <= num) {
        return str
      }
      // Return str truncated with '...' concatenated to the end of str.
      return str.slice(0, num)
    },
    getFanart (mediaItem) {
      // get fanart imageurl for mediaItem
      if (!mediaItem || !mediaItem.media_type) return ''
      if (mediaItem.metadata && mediaItem.metadata.fanart) return mediaItem.metadata.fanart
      if (mediaItem.album && mediaItem.album.metadata && mediaItem.album.metadata.fanart) return mediaItem.album.metadata.fanart
      if (mediaItem.artist && mediaItem.artist.metadata && mediaItem.artist.metadata.fanart) return mediaItem.artist.metadata.fanart
      if (mediaItem.artists.length > 0 && mediaItem.artists[0].metadata && mediaItem.artists[0].metadata.fanart) return mediaItem.artists[0].metadata.fanart
      if (mediaItem.artists.length > 1 && mediaItem.artists[1].metadata && mediaItem.artists[1].metadata.fanart) return mediaItem.artists[1].metadata.fanart
      if (mediaItem.artists.length > 2 && mediaItem.artists[2].metadata && mediaItem.artists[2].metadata.fanart) return mediaItem.artists[2].metadata.fanart
      // fallback to regular image
      if (mediaItem.metadata && mediaItem.metadata.image) return mediaItem.metadata.image
      if (mediaItem.album && mediaItem.album.metadata && mediaItem.album.metadata.image) return mediaItem.album.metadata.image
      if (mediaItem.artist && mediaItem.artist.metadata && mediaItem.artist.metadata.image) return mediaItem.artist.metadata.image
    }
  }
})
</script>
