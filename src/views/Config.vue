<template>
  <section>
    <!-- config main menu -->
    <v-card
      flat
      v-if="!configKey"
    >
      <v-list tile>
        <v-list-item
          tile
          v-for="(conf_value, conf_key) in conf"
          :key="conf_key"
          @click="$router.push('/config/' + conf_key)"
        >
          <v-list-item-icon style="margin-left:15px">
                  <v-icon large>{{ conf_value.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ conf_value.label }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <!-- generic and module settings -->
    <v-card
      flat
      v-if="configKey"
    >
      <v-list
        two-line
        tile
      >
        <v-list-group
          no-action
          v-for="(conf_value, conf_key) in config_items"
          :key="conf_key"
        >
          <template v-slot:activator>
            <v-list-item v-if="configKey == 'base'">
              <v-list-item-avatar
                tile
                style="margin-left:-15px"
              >
                <img
                  :src="require('../assets/' + conf_key + '.png')"
                  style="border-radius:5px;border: 1px solid rgba(0,0,0,.85);"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ conf_key }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="['player_providers', 'music_providers', 'metadata_providers', 'plugins'].includes(configKey)">
              <v-list-item-avatar
                tile
                style="margin-left:-15px"
              >
                <img
                  :src="$server.getProviderIconUrl(conf_key)"
                  style="border-radius:5px;border: 1px solid rgba(0,0,0,.85);"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ conf_value['__name__']['label'] }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="configKey == 'player_settings'">
              <v-list-item-avatar
                tile
                style="margin-left:-15px"
              >
                <img
                  :src="$server.getProviderIconUrl($server.players[conf_key].provider_id)"
                  style="border-radius:5px;border: 1px solid rgba(0,0,0,.85);"
                />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ $server.players[conf_key].name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list tile>
            <v-list-item
              tile
              style="margin-top:15px;margin-bottom:15px;"
              v-for="(conf_item_value, conf_item_key) in getCleanValues(conf_value)"
              :key="conf_item_key"
            >
            <!-- label -->
              <v-label
                v-if="conf_item_value['entry_type'] == 'label' && conf_item_key != '__name__'"
              >{{ conf_item_value['label'] }}</v-label>
              <!-- boolean value: toggle switch -->
              <v-switch
                v-if="conf_item_value['entry_type'] == 'boolean'"
                v-model="conf_item_value['value']"
                :placeholder="conf_item_value['default_value']"
                :label="conf_item_value['label']"
                :hint="conf_item_value['description']"
                :disabled="getDisabledState(conf_value, conf_item_value)"
                @change="saveConfig(configKey, conf_key, conf_item_key, conf_item_value['value'])"
              ></v-switch>
              <!-- textbox with single value -->
              <v-text-field
                v-if="
              (conf_item_value['entry_type'] == 'string' ||
                conf_item_value['entry_type'] == 'integer' ||
                conf_item_value['entry_type'] == 'float') &&
                !conf_item_value['values'].length && !conf_item_value['range'].length
            "
                v-model="conf_item_value['value']"
                :placeholder="conf_item_value['default_value'] ? conf_item_value['default_value'].toString() : ''"
                :label="conf_item_value['label']"
                :hint="conf_item_value['description']"
                :disabled="getDisabledState(conf_value, conf_item_value)"
                @change="saveConfig(configKey, conf_key, conf_item_key, conf_item_value['value'])"
                filled
              ></v-text-field>
              <!-- password value -->
              <v-text-field
                v-if="conf_item_value['entry_type'] == 'password'"
                v-model="conf_item_value['value']"
                :placeholder="conf_item_value['default_value']"
                :label="conf_item_value['label']"
                :hint="conf_item_value['description']"
                :disabled="getDisabledState(conf_value, conf_item_value)"
                type="password"
                @change="saveConfig(configKey, conf_key, conf_item_key, conf_item_value['value'])"
                filled
              ></v-text-field>
              <!-- value with dropdown -->
              <v-select
                :chips="conf_item_value['multi_value']"
                clearable
                :multiple="conf_item_value['multi_value']"
                v-if="
              conf_item_value['values'].length &&
                !conf_item_value['range'].length
            "
                v-model="conf_item_value['value']"
                :items="conf_item_value['values']"
                :placeholder="conf_item_value['default_value'] ? conf_item_value['default_value'].toString() : ''"
                :label="conf_item_value['label']"
                :hint="conf_item_value['description']"
                :disabled="getDisabledState(conf_value, conf_item_value)"
                filled
                @change="saveConfig(configKey, conf_key, conf_item_key, conf_item_value['value'])"
              ></v-select>
              <!-- value with range -->
              <v-slider
                v-if="conf_item_value['range'].length"
                :placeholder="conf_item_value['default_value'].toString()"
                v-model="conf_item_value['value']"
                :label="conf_item_value['label']"
                :hint="conf_item_value['description']"
                :disabled="getDisabledState(conf_value, conf_item_value)"
                @change="saveConfig(configKey, conf_key, conf_item_key, conf_item_value['value'])"
                :min="conf_item_value['range'][0]"
                :max="conf_item_value['range'][1]"
              ><template v-slot:append>
                <v-text-field
                  v-model="conf_item_value['value']"
                  class="mt-0 pt-0"
                  type="number"
                  style="width: 60px"
                ></v-text-field>
              </template>
              </v-slider>
            </v-list-item>
          </v-list>
          <v-divider></v-divider>
        </v-list-group>
      </v-list>
    </v-card>
  </section>
</template>

<script>
import Vue from 'vue'
export default {
  components: {},
  props: ['configKey'],
  data () {
    return {
      conf: {
        base: {
          label: this.$t('conf.base'),
          icon: 'mdi-tune'
        },
        music_providers: {
          label: this.$t('conf.music_providers'),
          icon: 'mdi-folder-music'
        },
        player_providers: {
          label: this.$t('conf.player_providers'),
          icon: 'mdi-disc-player'
        },
        metadata_providers: {
          label: this.$t('conf.metadata_providers'),
          icon: 'mdi-image-search'
        },
        plugins: {
          label: this.$t('conf.plugins'),
          icon: 'mdi-toy-brick-marker'
        },
        player_settings: {
          label: this.$t('conf.player_settings'),
          icon: 'mdi-headphones-settings'
        }
      },
      players: {},
      active: 0
    }
  },
  computed: {
    config_items () {
      if (!this.conf) return {}
      if (this.configKey === 'player_settings') {
        if (this.$server.players) {
          var result = {}
          for (const playerId in this.$server.players) {
            result[playerId] = this.conf.player_settings[playerId]
          }
        }
        return result
      } else if (this.configKey !== 'player_settings') {
        return this.conf[this.configKey]
      } else return this.conf
    }
  },
  created () {
    this.$store.windowtitle = this.$t('settings')
    if (this.configKey) {
      this.$store.windowtitle += ' | ' + this.$t('conf.' + this.configKey)
    }
    this.getConfig()
    this.$server.$on('refresh_listing', this.getConfig)
  },
  methods: {
    async getConfig () {
      if (!this.configKey || !this.$server.connected) return
      const language = navigator.language.split('-')[0]
      const conf = await this.$server.getData('config/' + this.configKey, { lang: language })
      Vue.set(this.conf, this.configKey, conf)
    },
    async saveConfig (baseKey, key, entryKey, newvalue) {
      const endpoint = 'config/' + baseKey + '/' + key + '/' + entryKey
      await this.$server.putData(endpoint, newvalue)
    },
    getDisabledState (confValues, confItemValue) {
      // disable UI elements if main item is disabled or depends_on is set
      if (confItemValue.entry_key === 'enabled') {
        return false
      }
      if (confValues.enabled && !confValues.enabled.value) { return true }
      if (confItemValue.depends_on && !confValues[confItemValue.depends_on].value) { return true }
      return false
    },
    getCleanValues (confValue) {
      // filter our special cases from a dict
      const newDict = {}
      for (const key in confValue) {
        if (!confValue[key].hidden) {
          newDict[key] = confValue[key]
        }
      }
      return newDict
    }

  }
}
</script>
