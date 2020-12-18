<template>
  <section>
    <v-tabs v-model="activeTab" grow show-arrows>
      <v-tab>
        {{ $t("queue_next_tracks") + " (" + next_items.length + ")" }}</v-tab
      >
      <v-tab-item>
        <v-list two-line>
          <RecycleScroller
            class="scroller"
            :items="next_items"
            :item-size="72"
            key-field="queue_item_id"
            v-slot="{ item }"
            page-mode
          >
            <ListviewItem
              v-bind:item="item"
              :hideavatar="item.media_type == 3 ? $store.state.isMobile : false"
              :hidetracknum="true"
              :hideproviders="$store.state.isMobile"
              :hidelibrary="$store.state.isMobile"
              :hidemenu="$store.state.isMobile"
              :onclickHandler="itemClicked"
            ></ListviewItem>
          </RecycleScroller>
        </v-list>
      </v-tab-item>
      <v-tab>
        {{
          $t("queue_previous_tracks") + " (" + previous_items.length + ")"
        }}</v-tab
      >
      <v-tab-item>
        <v-list two-line>
          <RecycleScroller
            class="scroller"
            :items="previous_items"
            :item-size="72"
            key-field="queue_item_id"
            v-slot="{ item }"
            page-mode
          >
            <ListviewItem
              v-bind:item="item"
              :hideavatar="item.media_type == 3 ? $store.state.isMobile : false"
              :hidetracknum="true"
              :hideproviders="$store.state.isMobile"
              :hidelibrary="$store.state.isMobile"
              :hidemenu="$store.state.isMobile"
              :onclickHandler="itemClicked"
            ></ListviewItem>
          </RecycleScroller>
        </v-list>
      </v-tab-item>
      <v-menu offset-y v-if="getSelectedPlayerQueue">
        <template v-slot:activator="{ on }">
          <v-btn text v-on="on" class="align-self-center mr-4" v-if="!$store.state.isMobile">
            {{ $t("queue_options") }}
            <v-icon right>arrow_drop_down</v-icon>
          </v-btn>
          <v-btn icon v-on="on" class="align-self-center mr-4" v-if="$store.state.isMobile">
            <v-icon>settings</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            @click="
              sendQueueCommand(
                'repeat_enabled',
                { enable_repeat: !getSelectedPlayerQueue.repeat_enabled }
              )
            "
          >
            <v-list-item-icon>
              <v-icon v-text="'repeat'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="
                  getSelectedPlayerQueue.repeat_enabled
                    ? $t('disable_repeat')
                    : $t('enable_repeat')
                "
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            @click="
              sendQueueCommand(
                'shuffle_enabled',
                { enable_shuffle: !getSelectedPlayerQueue.shuffle_enabled }
              )
            "
          >
            <v-list-item-icon>
              <v-icon v-text="'shuffle'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="
                  getSelectedPlayerQueue.shuffle_enabled
                    ? $t('disable_shuffle')
                    : $t('enable_shuffle')
                "
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="sendQueueCommand('clear')">
            <v-list-item-icon>
              <v-icon v-text="'clear'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="$t('queue_clear')" />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-tabs>
    <v-dialog
      v-model="showPlayMenu"
      max-width="500px"
    >
      <v-card>
        <v-subheader class="title">{{ selectedItem.name }}</v-subheader>
        <v-list>
          <v-list-item @click="sendQueueCommand('play_index/' + selectedItem.queue_item_id)">
            <v-list-item-icon>
              <v-icon v-text="'play_circle_outline'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="$t('play_now')"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="sendQueueCommand('move', { queue_item_id: selectedItem.queue_item_id, pos_shift: 0 })">
            <v-list-item-icon>
              <v-icon v-text="'queue_play_next'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="$t('play_next')"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="sendQueueCommand('move', { queue_item_id: selectedItem.queue_item_id, pos_shift: -1 })">
            <v-list-item-icon>
              <v-icon v-text="'arrow_upward'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="$t('queue_move_up')"
              />
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="sendQueueCommand('move', { queue_item_id: selectedItem.queue_item_id, pos_shift: 1 })">
            <v-list-item-icon>
              <v-icon v-text="'arrow_downward'" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title
                v-text="$t('queue_move_down')"
              />
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </section>
</template>

<script>
import Vue from 'vue'
import ListviewItem from '@/components/ListviewItem.vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  components: {
    ListviewItem
  },
  props: {},
  data () {
    return {
      items: [],
      activeTab: 0,
      showPlayMenu: false,
      selectedItem: {}
    }
  },
  watch: {
    getSelectedPlayerId: function (val) {
      this.getQueueItems()
    },
    curQueueItemId: function (val) {
      this.getQueueItems()
    }
  },
  computed: {
    ...mapGetters(['getSelectedPlayerId', 'getSelectedPlayerQueue']),
    next_items () {
      if (this.getSelectedPlayerQueue) {
        return this.items.slice(this.getSelectedPlayerQueue.cur_index)
      } else return []
    },
    previous_items () {
      if (this.getSelectedPlayerQueue && this.getSelectedPlayerId) {
        return this.items.slice(0, this.getSelectedPlayerQueue.cur_index)
      } else return []
    },
    curQueueItemId () {
      if (this.getSelectedPlayerQueue && this.getSelectedPlayerQueue.cur_item) {
        return this.getSelectedPlayerQueue.cur_item.queue_item_id
      }
      return null
    }
  },
  created () {
    this.$store.state.windowTitle = this.$t('queue')
    this.getQueueItems()
    this.$server.$on('queue items updated', this.getQueueItems)
  },
  methods: {
    itemClicked (item) {
      this.selectedItem = item
      this.showPlayMenu = !this.showPlayMenu
    },
    async getQueueItems () {
      if (!this.getSelectedPlayerQueue) return
      const endpoint = 'players/' + this.getSelectedPlayerQueue.queue_id + '/queue/items'
      this.$server.sendWsCommand(endpoint, null, function (res) {
        this.items = res
      }.bind(this))
    },
    sendQueueCommand (cmd, cmd_args = null) {
      const endpoint = `players/${this.getSelectedPlayerQueue.queue_id}/queue/cmd/${cmd}`
      this.$server.sendWsCommand(endpoint, cmd_args)
    }
  }
})
</script>
