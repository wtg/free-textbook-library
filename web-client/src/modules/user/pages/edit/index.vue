<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>
    <div class="row">
      <div class="col-sm-12">
        <h2>User - Edit</h2>
      </div>
    </div>

    <hr>

    <UserForm :model="model" />

    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button variant="secondary" to="/users" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Update User
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import UserForm from '@/modules/user/components/UserForm'

export default {
  props: ['id'],
  name: 'user_edit',
  metaInfo: {
    title: 'User - Edit'
  },
  components: {
    LoadingFull,
    UserForm
  },
  data () {
    return {
      fetching: false
    }
  },
  created () {
    this.fetching = true
    this.fetchEditModel(this.id)
    .then(() => this.fetching = false)
  },
  computed: mapGetters({
    model: 'user/editModel'
    // fetching: 'user/fetching'
  }),
  methods: mapActions({
    fetchEditModel: 'user/fetchEditModel',
    formSubmit: 'user/updateModel'
  })
}
</script>
