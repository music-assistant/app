<template>

  <v-dialog
    :value="$store.state.showLoginForm"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-toolbar
        dark
        flat
      >
        <v-toolbar-title>{{ this.$t('login.header') }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
        <br/>
          <v-text-field
            v-model="username"
            :label="this.$t('login.username')"
            name="username"
            prepend-icon="mdi-account"
            type="text"
            :rules="validateUsername"
            @change="connectError = false"
          ></v-text-field>
          <v-text-field
            v-model="password"
            :label="this.$t('login.password')"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
            :rules="validatePassword"
            @change="connectError = false"
          ></v-text-field>
          <v-checkbox
            v-model="permanentSession"
            :label="this.$t('login.save_creds')"
          ></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-text
        v-if="connectError"
        style="color: red"
      >
        {{ $t('login.login_failed') }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >{{ this.$t('login.login') }}</v-btn>
        <v-btn
          color="error"
          class="mr-4"
          @click="reset"
        >
          {{ this.$t('login.reset_form') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'

export default {
  props: {
    source: String
  },
  data () {
    return {
      servers: [],
      username: '',
      password: '',
      valid: true,
      permanentSession: false,
      connectError: false
    }
  },
  methods: {

    async submitLogin () {
      // Login to local server with username and password
      // For now, we only support connecting to the server hosted on same location as the web app
      // this will be changed to support secure remote connections through a broker service
      let serverAddress = window.location.href
      serverAddress = serverAddress.replace(':8080', ':8095') // dev
      serverAddress = serverAddress.split('#')[0] // strip off router path
      if (!serverAddress.endsWith('/')) {
        serverAddress = serverAddress + '/'
      }

      // perform login
      const endpoint = serverAddress + 'login'
      const formData = new FormData()
      formData.append('username', this.username)
      formData.append('password', this.password)
      if (this.permanentSession) {
        formData.append('app_id', 'browser login')
      }
      axios.post(endpoint, formData)
        .then(response => {
          // login success
          serverAddress = serverAddress.replace('http', 'ws')
          serverAddress += 'ws'
          this.$server.serverAddress = serverAddress
          this.$server.tokenInfo = response.data
          this.$server.wsConnect()
          localStorage.setItem('serverAddress', serverAddress)
          localStorage.setItem('tokenInfo', JSON.stringify(response.data))
        })
        .catch(e => {
          Vue.$log.error(e)
          this.connectError = true
        })
    },
    async validate () {
      this.$refs.form.validate()
      await this.submitLogin()
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    loginSuccessCallback (res) {
      this.connectError = !res
    }
  },
  async created () {
  },
  computed: {
    validateUsername () {
      const rules = []

      if (!this.username) {
        const rule = this.$t('login.username_empty')
        rules.push(rule)
      }
      return rules
    },
    validatePassword () {
      const rules = []
      // default password is empty
      return rules
    }
  }
}
</script>
