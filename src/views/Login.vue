<template>
  <v-container
    fluid
    fill-height
    :style="{backgroundPosition: 'center center', backgroundSize: 'cover', backgroundColor: '#ffffff', backgroundImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85) 100%, rgba(255, 255, 255, 0.85) 100%), url(img/background2.jpg)'}"
  >
    <v-layout
      align-center
      justify-center
    >
      <v-flex sm8>
        <v-card class="elevation-12">
          <v-toolbar
            dark
            flat
          >
            <v-toolbar-title>{{ this.$t("login.header") }}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <!-- uninitialized server: show setup form -->
          <v-card-text v-if="selectedServer && !selectedServer.initialized">
            <br />
            <b>Setup Music Assistant server {{ selectedServer.friendly_name }}</b>
            <br />
            <span>In order to use the MusicAssistant server, you must setup a username and password to protect the server.
              When you click submit, the server will be setup and you can login with the created credentials.</span>
            <br /><br />
            <v-form
              ref="form"
              v-model="valid"
              method="post"
            >
              <v-text-field
                @keyup.enter="submit"
                v-model="username"
                prepend-icon="mdi-account"
                label="Username"
                type="text"
                required
                autocomplete="new-password"
                :rules="[v => !!v || 'Username is required']"
              ></v-text-field>
              <v-text-field
                @keyup.enter="submit"
                v-model="password"
                prepend-icon="mdi-lock"
                label="Password"
                type="password"
                required
                autocomplete="new-password"
                :rules="[v => v.length >= 8 || 'Password must have minimum of 8 characters']"
              ></v-text-field>
              <v-text-field
                @keyup.enter="submit"
                v-model="password2"
                prepend-icon="mdi-lock"
                label="Repeat password"
                id="password"
                type="password"
                required
                :rules="[
                password === password2 || 'Passwords do not match'
            ]"
              ></v-text-field>
              <br />
            </v-form>
            <v-btn
              width="100%"
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="submitSetup()"
              @mouseover="$refs.form.validate()"
            >{{ this.$t("login.submit") }}</v-btn>
          </v-card-text>
          <!-- regular login form -->
          <v-card-text v-else>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <br />
              <v-select
                :items="servers"
                :label="this.$t('login.server')"
                :item-text="function (item) {return `${item.friendly_name} (${item.ip_address})`}"
                return-object
                prepend-icon="mdi-server-network"
                v-model="selectedServer"
              ></v-select>
              <v-text-field
                v-model="username"
                :label="this.$t('login.username')"
                prepend-icon="mdi-account"
                type="text"
                :rules="validateUsername"
                :disabled="!selectedServer"
                name="username"
              ></v-text-field>
              <v-text-field
                v-model="password"
                :label="this.$t('login.password')"
                prepend-icon="mdi-lock"
                type="password"
                :rules="validatePassword"
                :disabled="!selectedServer"
                name="password"
              ></v-text-field>
              <v-checkbox
                v-model="permanentSession"
                :label="this.$t('login.save_creds')"
                :disabled="!selectedServer"
              ></v-checkbox>
            </v-form>
            <v-btn
              width="100%"
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="submitLogin()"
              @mouseover="$refs.form.validate()"
            >{{ this.$t("login.login") }}</v-btn>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
      selectedServer: null,
      username: '',
      password: '',
      password2: '',
      valid: false,
      permanentSession: false
    }
  },
  methods: {
    discoverServers () {
      // discover Music Assistant servers on the network
      // if we're running in the browser this is pretty limited as we can't do
      // mdns/avahi discovery but the (first) local server on the network, reachable at http://musicassistant.local:8095
      // will serve discovery info with a get request to the index.

      // TODO: Implement avahi discovery for native clients.
      axios
        .get('http://musicassistant.local:8095')
        .then(response => {
          // server running at this endpoint
          this.servers = [response.data]
          // select discovered server
          if (!this.selectedServer) {
            this.selectedServer = this.servers[0]
          }
        })
        .catch(e => {
          Vue.$log.error('Server discovery failed', e)
          this.servers = []
          // TODO: Use remote connect feature here
        })
    },

    async submitLogin () {
      // Login to server with username and password
      const serverAddress = this.selectedServer.address
      const socket = new WebSocket(serverAddress)

      socket.onopen = function (e) {
        // send get_token command once connection is ready
        const loginData = {
          username: this.username,
          password: this.password,
          app_id: this.permanentSession ? 'browser' : null
        }
        socket.send(
          JSON.stringify({
            command: 'get_token',
            data: loginData
          })
        )
      }.bind(this)

      socket.onmessage = function (msg) {
        const jsonMsg = JSON.parse(msg.data)
        if (
          jsonMsg.result &&
          !jsonMsg.error &&
          jsonMsg.result === 'get_token'
        ) {
          // login success
          this.$store.dispatch('dispatchNotification', {
            content: 'Connected to Music Assistant server',
            type: 'success'
          })
          const tokenInfo = jsonMsg.data
          localStorage.setItem('serverAddress', serverAddress)
          localStorage.setItem('tokenInfo', JSON.stringify(tokenInfo))
          this.$server.serverAddress = serverAddress
          this.$server.tokenInfo = tokenInfo
          this.$server.wsConnect()
        } else if (jsonMsg.error) {
          this.$store.dispatch('dispatchNotification', {
            content: jsonMsg.error,
            type: 'error'
          })
        }
        // close socket as soon as message is received
        socket.close()
      }.bind(this)

      socket.onerror = function (e) {
        this.$store.dispatch('dispatchNotification', {
          content: 'Error while connecting to server',
          type: 'error'
        })
      }.bind(this)
    },
    async submitSetup () {
      // Setup server with username and password
      const serverAddress = this.selectedServer.address
      const socket = new WebSocket(serverAddress)

      socket.onopen = function (e) {
        // send setup command once connection is ready
        const loginData = {
          username: this.username,
          password: this.password
        }
        socket.send(
          JSON.stringify({
            command: 'setup',
            data: loginData
          })
        )
      }.bind(this)

      socket.onmessage = function (msg) {
        const jsonMsg = JSON.parse(msg.data)
        if (jsonMsg.result && !jsonMsg.error && jsonMsg.result === 'setup') {
          // setup success, login with creds
          this.submitLogin()
        } else if (jsonMsg.error) {
          this.$store.dispatch('dispatchNotification', {
            content: jsonMsg.error,
            type: 'error'
          })
        }
        // close socket as soon as message is received
        socket.close()
      }.bind(this)

      socket.onerror = function (e) {
        this.$store.dispatch('dispatchNotification', {
          content: 'Error while connecting to server',
          type: 'error'
        })
      }.bind(this)
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  },
  async mounted () {
    this.discoverServers()
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
      if (!this.password) {
        const rule = this.$t('login.password_empty')
        rules.push(rule)
      }
      return rules
    }
  }
}
</script>
