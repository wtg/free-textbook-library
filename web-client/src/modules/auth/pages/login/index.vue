<template>
  <div class="app d-flex flex-row align-items-center">
    <div class="container">
      <Loading v-if="fetching" />
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <b-form>
                  <h1>Login</h1>
                  <p class="text-muted">Sign In to your account</p>
                  <b-input-group class="mb-3">
                    <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="username email" v-model="login_user.username" />
                  </b-input-group>
                  <b-input-group class="mb-4">
                    <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="current-password" v-model="login_user.password" />
                  </b-input-group>
                  <b-row>
                    <b-col cols="6">
                      <b-button variant="primary" class="px-4" @click="login()">Login</b-button>
                    </b-col>
                    <b-col cols="6" class="text-right">
                      <b-button variant="link" class="px-0">Forgot password?</b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </b-card-body>
            </b-card>
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Register a new account to get started using all the great features of this web application</p>
                  <b-button to="/auth/register" variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import FormInput from '@/components/FormInput'
import Loading from '@/components/Loading'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Login',
  metaInfo: {
    title: 'Login'
  },
  components: {
    FormInput,
    Loading
  },
  computed: mapGetters({
    login_user: 'auth/login_user',
    fetching: 'auth/logging_in'
  }),
  methods: mapActions({
    login: 'auth/login'
  })
}
</script>
