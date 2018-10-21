<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h2>User - New</h2>
      </div>
    </div>

    <hr>

    <UserForm :model="model" />
    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button to="/users" variant="light" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Create User
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import UserForm from '@/modules/user/components/UserForm'

export default {
  name: 'UserNew',
  metaInfo: {
    title: 'User - New'
  },
  components: {
    UserForm
  },
  created () {
    this.resetNewModel()
  },
  computed: mapGetters({
    model: 'user/newModel'
  }),
  methods: {
    ...mapActions({
      formSubmit: 'user/createModel'
    }),
    ...mapMutations({
      resetNewModel: 'user/resetNewModel'
    })
  }
}
</script>
