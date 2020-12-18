<template>
  <v-card
    :min-height="thumbHeight"
    :min-width="thumbWidth"
    :max-width="thumbWidth*1.4"
    hover
    outlined
    @click.left="onclickHandler ? onclickHandler(item) : itemClicked(item)"
    @contextmenu="menuClick"
    @contextmenu.prevent
    v-longpress="menuClick"
  >
    <MediaItemThumb :item="item" :key="item.item_id" :size="thumbWidth"/>
    <div v-if="isHiRes" style="position:absolute;margin-left:5px;margin-top:-20px;height:30px;background-color: white;border-radius: 3px;">
    <v-tooltip bottom>
          <template v-slot:activator="{ on }">
          <img :src="require('../assets/hires.png')" height="35" v-on="on" />
          </template>
          <span>{{ isHiRes }}</span>
        </v-tooltip>
    </div>
    <v-divider />
    <v-card-title
      :class="$store.state.isMobile ? 'body-2' : 'title'"
      v-text="item.name"
      style="padding: 8px;color: primary;margin-top:8px"
    />
    <v-card-subtitle
      :class="$store.state.isMobile ? 'caption' : 'body-1'"
      v-text="item.artist.name"
      v-if="item.artist"
      style="padding: 8px"
    />
    <v-card-subtitle
      :class="$store.state.isMobile ? 'caption' : 'body-1'"
      v-text="item.artists[0].name"
      v-if="item.artists"
      style="padding: 8px"
    />
  </v-card>
</template>

<script>
import Vue from 'vue'
import MediaItemThumb from '@/components/MediaItemThumb.vue'

const PRESS_TIMEOUT = 600

Vue.directive('longpress', {
  bind: function (el, { value }, vNode) {
    if (typeof value !== 'function') {
      Vue.$log.warn(`Expect a function, got ${value}`)
      return
    }
    let pressTimer = null
    const start = e => {
      if (e.type === 'click' && e.button !== 0) {
        return
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => value(e), PRESS_TIMEOUT)
      }
    }
    const cancel = () => {
      if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
      }
    }
    ;['mousedown', 'touchstart'].forEach(e => el.addEventListener(e, start))
    ;['click', 'mouseout', 'touchend', 'touchcancel'].forEach(e => el.addEventListener(e, cancel))
  }
})

export default Vue.extend({
  components: {
    MediaItemThumb
  },
  props: {
    item: Object,
    thumbHeight: Number,
    thumbWidth: Number,
    hideproviders: Boolean,
    hidelibrary: Boolean,
    onclickHandler: null
  },
  data () {
    return {
      touchMoving: false,
      cancelled: false
    }
  },
  computed: {
    isHiRes () {
      for (var prov of this.item.provider_ids) {
        if (prov.quality !== 99 && prov.quality > 6) {
          if (prov.details) {
            return prov.details
          } else if (prov.quality === 7) {
            return '44.1/48khz 24 bits'
          } else if (prov.quality === 8) {
            return '88.2/96khz 24 bits'
          } else if (prov.quality === 9) {
            return '176/192khz 24 bits'
          } else {
            return '+192kHz 24 bits'
          }
        }
      }
      return ''
    }
  },
  created () { },
  beforeDestroy () {
    this.cancelled = true
  },
  mounted () { },
  methods: {
    itemClicked (mediaItem = null) {
      // mediaItem in the list is clicked
      let url = ''
      if (mediaItem.media_type === 'artist') {
        url = '/artists/' + mediaItem.item_id
      } else if (mediaItem.media_type === 'album') {
        url = '/albums/' + mediaItem.item_id
      } else if (mediaItem.media_type === 'playlist') {
        url = '/playlists/' + mediaItem.item_id
      } else {
        // assume track (or radio) item
        this.$server.$emit('showPlayMenu', mediaItem)
        return
      }
      this.$router.push({ path: url, query: { provider: mediaItem.provider } })
    },
    menuClick () {
      // contextmenu button clicked
      if (this.cancelled) return
      this.$server.$emit('showContextMenu', this.item)
    },
    async toggleLibrary (mediaItem) {
      // library button clicked on item
      this.cancelled = true
      await this.$server.toggleLibrary(mediaItem)
      this.cancelled = false
    }
  }
})
</script>
