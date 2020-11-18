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
      // connect to server
      // TODO: support for external connect
      this.$server.localLogin(this.username, this.password, this.permanentSession, this.loginSuccessCallback)
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
