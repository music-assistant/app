<template>
  <v-bottom-sheet v-model="show" hide-overlay height="40px">
    <v-sheet v-model="show" class="text-center" :color="type">
      <v-list-item>
        <v-list-item-avatar>
          <v-icon large dark v-if="type == 'success'">mdi-information</v-icon>
          <v-icon large dark v-else-if="type == 'warning'"
            >mdi-alert-circle</v-icon
          >
          <v-icon large dark v-else-if="type == 'error'">mdi-alert</v-icon>
          <v-icon large dark v-else>mdi-information-outline</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="color: white">{{
            content
          }}</v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn @click="show = !show">
            sluiten
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script lang="js">
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  data: () => ({
    show: false,
    content: '',
    type: 'info',
    showProgress: false,
    currentNotification: null
  }),

  watch: {
    notification: function (newNotification) {
      if (newNotification !== this.currentNotification) {
        this.setNotification(newNotification)
      }
    }
  },

  computed: {
    ...mapGetters(['notification'])
  },

  methods: {
    async hide () {
      this.show = false
      await new Promise(resolve => setTimeout(() => resolve(), 500))
    },

    // eslint-disable-next-line
    async setNotification(notification) {
      if (this.show) {
        await this.hide()
      }
      if (notification) {
        this.currentNotification = notification
        this.content = notification.content
        this.type = notification.type || 'info'
        this.showProgress = notification.showProgress || false
        this.show = true
        setTimeout(() => {
          if (this.currentNotification === notification) {
            this.hide()
          }
        }, 6500)
      } else {
        this.content = ''
        this.type = 'info'
        this.showProgress = false
      }
    }
  }
})
</script>
