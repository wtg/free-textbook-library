
<template>
  <div class="card mb-3">
    <div class="card-body">

      <!-- Bootstrap Modal Component -->
      <b-modal :id="'destroyModal'"
        :title="'Destroy User?'"
        @ok="onConfirmDestroy(model)"
        header-bg-variant='dark'
        header-text-variant='light'
        body-bg-variant='dark'
        body-text-variant='light'
        footer-bg-variant='danger'
        footer-text-variant='light'
        ok-variant='danger'
        ok-title='DESTROY'
        cancel-title='Cancel'
        cancel-variant='dark'
      >
        <p class="text-left">Are you sure you want to destroy this User?</p>
      </b-modal>

      <div class="row">
        <div class="col-sm-8">
          <h2>
            {{ header || 'User Detail' }}
          </h2>
        </div>
        <div class="col-sm-4 text-right">

          <!-- Edit -->
          <b-button size="sm" variant="outline-warning" :to="'/users/' + model._id + '/edit'">
            <i class="fa fa-fw fa-pencil"></i>
          </b-button>

          <!-- Destroy -->
          <b-button size="sm" variant="outline-danger" v-b-modal="'destroyModal'">
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

        </div>
      </div>

      <table class="table" v-if='!fetching'>

        <!-- Table Header -->
        <tbody>
          <tr>
            <td>E-Mail</td>
            <td>{{model.email}}</td>
          </tr>
          <tr>
            <td>Username</td>
            <td>{{model.username}}</td>
          </tr>
          <tr>
            <td>Roles</td>
            <td>{{model.roles.join(', ')}}</td>
          </tr>
          <tr>
            <td>Verified</td>
            <td>
              <span>
                <i class="fa fa-fw fa-check-square-o" v-if="model.verified"></i>
                <i class="fa fa-fw fa-square-o" v-if="!model.verified"></i>
              </span>
            </td>
          </tr>
          <tr>
            <td>Banned</td>
            <td>
              <span>
                <i class="fa fa-fw fa-check-square-o" v-if="model.banned"></i>
                <i class="fa fa-fw fa-square-o" v-if="!model.banned"></i>
              </span>
            </td>
          </tr>
        </tbody>

      </table>
      <Loading v-else />

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '@/components/Loading'

export default {
  props: ['id', 'model', 'fetching', 'header'],
  name: 'UserShowWidget',
  components: {
    Loading
  },
  methods: mapActions({
    onConfirmDestroy: 'user/deleteModel'
  })
}
</script>
