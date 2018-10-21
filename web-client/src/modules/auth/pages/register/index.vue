<template>
  <div class="app d-flex flex-row align-items-center">
    <div class="container">
      <Loading v-if="fetching" />
      <b-row class="justify-content-center">
        <b-col md="6" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-form>
                <h1>Register</h1>
                <p class="text-muted">Create your account</p>

                <b-input-group class="mb-3">
                  <b-form-input type="text" class="form-control" placeholder="Username" autocomplete="username" v-model="register_user.username" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-form-input type="text" class="form-control" placeholder="Email" autocomplete="email" v-model="register_user.email" />
                </b-input-group>

                <b-input-group class="mb-3">
                  <b-form-input type="password" class="form-control" placeholder="Password" autocomplete="new-password" v-model="register_user.password" />
                </b-input-group>

                <b-input-group class="mb-4">
                  <b-form-input type="password" class="form-control" placeholder="Repeat password" autocomplete="new-password" v-model="register_user.passwordverify" />
                </b-input-group>

                <p v-if="register_user.error" class="error">Bad registration information</p>

                <b-button variant="primary" block @click="register()">
                  Create Account
                </b-button>
              </b-form>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import FormInput from '@/components/FormInput'
import FormSubmit from '@/components/FormSubmit'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Register',
  metaInfo: {
    title: 'Register'
  },
  components: {
    Loading,
    FormInput,
    FormSubmit
  },
  computed: mapGetters({
    fetching: 'auth/logging_in',
    register_user: 'auth/register_user'
  }),
  methods: mapActions({
    register: 'auth/register'
  })
}
</script>
