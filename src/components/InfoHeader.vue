<template>
  <v-flex v-observe-visibility="visibilityChanged">
    <v-card
      tile
      :img="require('../assets/info_gradient.jpg')"
      style="margin-top:-60px;"
      :height="showFullInfo ? '110%' : '340'"
    >
      <v-img
        width="100%"
        :height="showFullInfo ? '100%' : '340'"
        position="center top"
        :src="getFanart(itemDetails)"
        :gradient="$vuetify.theme.dark ? 'to bottom, rgba(0,0,0,.90), rgba(0,0,0,.75)' : 'to bottom, rgba(255,255,255,.90), rgba(255,255,255,.75)'"
      >
        <div class="text-xs-center" style="height:40px;" id="whitespace_top" />

        <v-layout style="margin-left:5pxmargin-right:5px;" v-if="itemDetails">
          <!-- left side: cover image -->
          <v-flex xs5 pa-5 v-if="!$store.state.isMobile">
            <v-img
              :src="getImage(itemDetails)"
              :lazy-src="require('../assets/default_artist.png')"
              width="220px"
              height="220px"
              style="border: 3px solid rgba(0,0,0,.33);border-radius: 3px;"
            ></v-img>
          </v-flex>

          <v-flex>
            <!-- Main title -->
            <v-card-title
            >
              {{ itemDetails.name }}
            </v-card-title>

            <!-- other details -->
            <v-card-subtitle>
              <!-- version -->
              <div
                v-if="itemDetails.version"
                class="caption"
              >
                {{ itemDetails.version }}
              </div>

              <!-- item artists -->
              <div
                class="title accent--text"
                v-if="itemDetails.artists"
              >
                <v-icon
                  style="margin-left: -3px;margin-right:3px"
                  small
                  color="primary"
                  >person</v-icon
                >
                <span
                  v-for="(artist, artistindex) in itemDetails.artists"
                  :key="artist.db_id"
                >
                  <a style="color: accent" v-on:click="artistClick(artist)">{{
                    artist.name
                  }}</a>
                  <span
                    style="color: accent"
                    v-if="artistindex + 1 < itemDetails.artists.length"
                    :key="artistindex"
                    >{{ " / " }}</span
                  >
                </span>
              </div>

              <!-- album artist -->
              <div class="title" v-if="itemDetails.artist">
                <v-icon
                  style="margin-left: -3px;margin-right:3px"
                  small
                  color="primary"
                  >person</v-icon
                >
                <a
                  v-on:click="artistClick(itemDetails.artist)"
                  >{{ itemDetails.artist.name }}</a
                >
              </div>

              <!-- playlist owner -->
              <div
                class="title"
                v-if="itemDetails.owner"
              >
                <v-icon
                  color="primary"
                  style="margin-left: -3px;margin-right:3px"
                  small
                  >person</v-icon
                >
                <a style="color:primary">{{ itemDetails.owner }}</a>
              </div>

              <div
                v-if="itemDetails.album"
              >
                <v-icon
                  color="primary"
                  style="margin-left: -3px;margin-right:3px"
                  small
                  >album</v-icon
                >
                <a
                  style="color:secondary"
                  v-on:click="albumClick(itemDetails.album)"
                  >{{ itemDetails.album.name }}</a
                >
              </div>
            </v-card-subtitle>

            <!-- play/info buttons -->
            <div style="margin-left:14px;">
              <v-btn
                color="primary"
                tile
                @click="$server.$emit('showPlayMenu', itemDetails)"
              >
                <v-icon left>play_circle_filled</v-icon>
                {{ $t("play") }}
              </v-btn>
              <v-btn
                style="margin-left:10px;"
                v-if="
                  !$store.state.isMobile &&
                    !itemDetails.in_library
                "
                color="primary"
                tile
                @click="toggleLibrary(itemDetails)"
              >
                <v-icon left>favorite_border</v-icon>
                {{ $t("add_library") }}
              </v-btn>
              <v-btn
                style="margin-left:10px;"
                v-if="
                  !$store.state.isMobile &&
                    itemDetails.in_library
                "
                color="primary"
                tile
                @click="toggleLibrary(itemDetails)"
              >
                <v-icon left>favorite</v-icon>
                {{ $t("remove_library") }}
              </v-btn>
            </div>

            <!-- Description/metadata -->
            <v-card-subtitle class="body-2 justify-left">
                <span v-if="showFullInfo" v-html="getDescription()"/>
                <span v-else v-html="truncateText(getDescription(), $store.state.isMobile ? 180 : 380)"/>
                <v-icon v-if="showFullInfo" @click="showFullInfo = false">mdi-chevron-up</v-icon>
                <v-icon v-else @click="showFullInfo = true">mdi-chevron-down</v-icon>
            </v-card-subtitle>
            <!-- genres -->
            <div class="justify-center" v-if="itemDetails && itemDetails.metadata.genres" style="margin-left:15px;">
            <v-chip color="blue-grey lighten-1" style="margin-right:5px;margin-bottom:5px" small outlined v-for="tag of itemDetails.metadata.genres" :key="tag">{{ tag }}</v-chip>
          </div>
          </v-flex>
          <!-- tech specs and provider icons -->
          <div style="margin-top:15px">
            <ProviderIcons
              v-bind:providerIds="itemDetails.provider_ids"
              :height="25"
            />
          </div>
        </v-layout>
      </v-img>
    </v-card>
  </v-flex>
</template>

<script>
import Vue from 'vue'
import ProviderIcons from '@/components/ProviderIcons.vue'
import VueObserveVisibility from 'vue-observe-visibility'
Vue.use(VueObserveVisibility)

export default Vue.extend({
  components: {
    ProviderIcons
  },
  props: ['itemDetails'],
  data () {
    return {
      showFullInfo: false
    }
  },
  mounted () { },
  created () {
    this.$store.state.topBarTransparent = true
  },
  beforeDestroy () {
    this.$store.state.topBarTransparent = false
    this.$store.state.topBarContextItem = null
  },
  watch: {
    itemDetails: function (val) {
      // set itemDetails as contextitem
      if (val) {
        this.$store.state.topBarContextItem = val
        this.$store.state.windowTitle = val.name
      }
    }
  },
  computed: {
  },
  methods: {
    visibilityChanged (isVisible, entry) {
      if (isVisible) this.$store.state.topBarTransparent = true
      else this.$store.state.topBarTransparent = false
    },
    artistClick (item) {
      // artist entry clicked
      var url = '/artists/' + item.item_id
      this.$router.push({ path: url, query: { provider: item.provider } })
    },
    albumClick (item) {
      // album entry clicked
      var url = '/albums/' + item.item_id
      this.$router.push({ path: url, query: { provider: item.provider } })
    },
    toggleLibrary (item) {
      // library button clicked on item
      this.$server.toggleLibrary(item)
    },
    getDescription () {
      var desc = ''
      if (!this.itemDetails) return ''
      if (this.itemDetails.metadata && this.itemDetails.metadata.description) {
        return this.itemDetails.metadata.description
      } else if (this.itemDetails.metadata && this.itemDetails.metadata.biography) {
        return this.itemDetails.metadata.biography
      } else if (this.itemDetails.metadata && this.itemDetails.metadata.copyright) {
        return this.itemDetails.metadata.copyright
      } else if (this.itemDetails.artists) {
        this.itemDetails.artists.forEach(function (artist) {
          if (artist.metadata && artist.metadata.biography) {
            desc = artist.metadata.biography
          }
        })
      }
      return desc
    },
    truncateText (text, maxChars) {
      var valContainer = text
      if (text.length > maxChars) {
        valContainer = valContainer.substring(0, maxChars) + '...'
      }
      return (valContainer)
    },
    getQualityInfo () {
    },
    getUniqueProviders () {
      var keys = []
      var qualities = []
      if (!this.providerIds) return []
      const sortedItemIds = this.providerIds.slice()
      sortedItemIds.sort((a, b) =>
        a.quality < b.quality ? 1 : b.quality < a.quality ? -1 : 0
      )
      for (var item of sortedItemIds) {
        if (!keys.includes(item.provider)) {
          qualities.push(item)
          keys.push(item.provider)
        }
      }
      return qualities
    },
    getImage (mediaItem) {
      // get imageurl for mediaItem
      if (!mediaItem || !mediaItem.media_type) return ''
      if (mediaItem.metadata && mediaItem.metadata.image) return mediaItem.metadata.image
      if (mediaItem.album && mediaItem.album.metadata && mediaItem.album.metadata.image) return mediaItem.album.metadata.image
      if (mediaItem.artist && mediaItem.artist.metadata && mediaItem.artist.metadata.image) return mediaItem.artist.metadata.image
    },
    getFanart (mediaItem) {
      // get fanart imageurl for mediaItem
      if (!mediaItem || !mediaItem.media_type) return ''
      if (mediaItem.metadata && mediaItem.metadata.fanart) return mediaItem.metadata.fanart
      if (mediaItem.album && mediaItem.album.metadata && mediaItem.album.metadata.fanart) return mediaItem.album.metadata.fanart
      if (mediaItem.artist && mediaItem.artist.metadata && mediaItem.artist.metadata.fanart) return mediaItem.artist.metadata.fanart
      // fallback to regular image
      return this.getImage(mediaItem)
    }
  }
})
</script>
