<template>
  <section>
    <v-app-bar
      flat
      dense
      color="transparent"
    >
      <v-label>{{ items.length + " " + $t("items") }}</v-label>
      <v-spacer></v-spacer>
      <v-menu left :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>sort</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item of sortKeys"
            :key="item.value"
            v-text="item.text"
            @click="sortBy = item.value"
          >
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn icon @click="sortDesc = !sortDesc">
        <v-icon v-if="!sortDesc">arrow_upward</v-icon>
        <v-icon v-if="sortDesc">arrow_downward</v-icon>
      </v-btn>
      <v-menu left :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>search</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-text-field
            v-model="search"
            clearable
            prepend-inner-icon="search"
            label="Search"
            hide-details
            solo
            dense
          ></v-text-field>
        </v-card>
      </v-menu>
      <v-btn icon @click="toggleViewMode()" style="margin-right:-15px;">
        <v-icon v-if="viewMode == 'panel'">view_list</v-icon>
        <v-icon v-if="viewMode == 'list'">grid_on</v-icon>
      </v-btn>
    </v-app-bar>
    <v-data-iterator
      :items="items"
      :search="search"
      :sort-by="sortBy"
      :sort-desc="sortDesc"
      :custom-filter="filteredItems"
      hide-default-footer
      disable-pagination
      loading
    >
      <template v-slot:default="props">
        <v-container fluid v-if="viewMode == 'panel'">
          <v-row dense align-content="stretch" align="stretch">
            <v-col
              v-for="item in props.items"
              :key="item.item_id"
              align-self="stretch"
            >
              <PanelviewItem
                :item="item"
                :thumbWidth="thumbWidth"
                :thumbHeight="thumbHeight"
              />
            </v-col>
          </v-row>
        </v-container>
        <v-list two-line v-if="viewMode == 'list'">
          <RecycleScroller
            class="scroller"
            :items="props.items"
            :item-size="72"
            key-field="item_id"
            v-slot="{ item }"
            page-mode
          >
            <ListviewItem
              v-bind:item="item"
              :hideavatar="item.media_type == 'track' ? $store.state.isMobile : false"
              :hidetracknum="true"
              :hideproviders="['artist', 'album', 'track'].includes(item.media_type) ? $store.state.isMobile : false"
              :hidelibrary="true"
              :hidemenu="item.media_type == 'track' ? $store.state.isMobile : false"
              :hideduration="item.media_type == 'radio'"
            ></ListviewItem>
          </RecycleScroller>
        </v-list>
      </template>
    </v-data-iterator>
  </section>
</template>

<style scoped>
.scroller {
  height: 100%;
}
</style>

<script>
// @ is an alias to /src
import ListviewItem from '@/components/ListviewItem.vue'
import PanelviewItem from '@/components/PanelviewItem.vue'

export default {
  components: {
    ListviewItem,
    PanelviewItem
  },
  props: [
    'mediatype',
    'items'
  ],
  data () {
    return {
      viewMode: 'list',
      search: '',
      sortDesc: false,
      sortBy: 'name',
      sortKeys: [{ text: this.$t('sort_name'), value: 'name' }]
    }
  },
  created () {
    if (this.mediatype === 'playlisttracks') {
      // playlist tracks
      this.sortKeys.push({ text: this.$t('sort_position'), value: 'position' })
      this.sortKeys.push({ text: this.$t('sort_artist'), value: 'artists[0].name' })
      this.sortKeys.push({ text: this.$t('sort_album'), value: 'album.name' })
      this.sortBy = 'position'
      this.viewMode = 'list'
    } else if (this.mediatype === 'tracks') {
      // tracks listing
      this.sortKeys.push({ text: this.$t('sort_artist'), value: 'artists[0].name' })
      this.sortKeys.push({ text: this.$t('sort_album'), value: 'album.name' })
      this.viewMode = 'list'
    } else if (this.mediatype === 'albums') {
      // albums listing
      this.sortKeys.push({ text: this.$t('sort_artist'), value: 'artist.name' })
      this.sortKeys.push({ text: this.$t('sort_date'), value: 'year' })
      this.viewMode = 'panel'
    } else {
      this.viewMode = 'list'
    }
    // get stored viewMode for this mediatype
    const viewMode = localStorage.getItem('viewMode' + this.mediatype)
    if (viewMode !== null) {
      this.viewMode = viewMode
    }
  },
  computed: {
    thumbWidth () {
      return this.$store.state.isMobile ? 120 : 175
    },
    thumbHeight () {
      return this.thumbWidth * 1.5
    }
  },
  methods: {
    toggleViewMode () {
      if (this.viewMode === 'panel') this.viewMode = 'list'
      else this.viewMode = 'panel'
      localStorage.setItem('viewMode' + this.mediatype, this.viewMode)
    },
    filteredItems (items, search) {
      if (!search) return items
      search = search.toLowerCase()
      const newLst = []
      for (const item of items) {
        if (item.name.toLowerCase().includes(search)) {
          newLst.push(item)
        } else if (item.artist && item.artist.name.toLowerCase().includes(search)) {
          newLst.push(item)
        } else if (item.album && item.album.name.toLowerCase().includes(search)) {
          newLst.push(item)
        } else if (item.artists && item.artists[0].name.toLowerCase().includes(search)) {
          newLst.push(item)
        }
      }
      return newLst
    }
  }
}
</script>
