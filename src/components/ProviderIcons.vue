<template>
  <div>
  <img
    v-for="prov of uniqueProviders" :key="prov.provider"
    :height="height"
    :src="getProviderIcon(prov.provider)"
    style="margin-right:6px;margin-top:6px;"
  />
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  props: {
    providerIds: Array,
    height: Number
  },
  data () {
    return {
      isHiRes: false
    }
  },
  computed: {
    ...mapGetters(['getProviderIcon']),
    uniqueProviders: function () {
      var output = []
      var keys = []
      if (!this.providerIds) return []
      this.providerIds.forEach(function (prov) {
        var key = prov.provider
        if (keys.indexOf(key) === -1) {
          keys.push(key)
          output.push(prov)
        }
      })
      return output
    }
  },
  mounted () { },
  methods: {
  }
})
</script>
