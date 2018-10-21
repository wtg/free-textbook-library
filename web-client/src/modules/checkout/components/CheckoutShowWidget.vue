
<template>
  <div class="card mb-3">
    <div class="card-body">

      <!-- Bootstrap Modal Component -->
      <b-modal :id="'destroyModal'"
        :title="'Destroy Checkout?'"
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
        <p class="text-left">Are you sure you want to destroy this Checkout?</p>
      </b-modal>

      <div class="row">
        <div class="col-sm-8">
          <h2>
            {{ header || 'Checkout Detail' }}
          </h2>
        </div>
        <div class="col-sm-4 text-right">

          <!-- Edit -->
          <b-button size="sm" variant="outline-warning" :to="'/checkouts/' + model._id + '/edit'">
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
            <td>Start Date</td>
            <td>{{model.start_date}}</td>
          </tr>
          <tr>
            <td>End Date</td>
            <td>{{model.end_date}}</td>
          </tr>
          <tr>
            <td>Status</td>
            <td>{{model.status}}</td>
          </tr>
          <tr>
            <td>Check Out Librarian</td>
            <td v-if="model.check_out_librarian_id">
              <router-link :to="'/users/' + model.check_out_librarian_id">
                {{model.check_out_librarian.email}}
              </router-link>
            </td>
            <td v-else>N/A</td>
          </tr>
          <tr>
            <td>Check In Librarian</td>
            <td v-if="model.check_in_librarian_id">
              <router-link :to="'/users/' + model.check_in_librarian_id">
                {{model.check_in_librarian.email}}
              </router-link>
            </td>
            <td v-else>N/A</td>
          </tr>
          <tr>
            <td>Renter</td>
            <td v-if="model.renter_id">
              <router-link :to="'/users/' + model.renter_id">
                {{model.renter.email}}
              </router-link>
            </td>
            <td v-else>N/A</td>
          </tr>
          <tr>
            <td>Book</td>
            <td v-if="model.book_id">
              <router-link :to="'/books/' + model.book_id">
                {{model.book.slug}}
              </router-link>
            </td>
            <td v-else>N/A</td>
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
  name: 'CheckoutShowWidget',
  components: {
    Loading
  },
  methods: mapActions({
    onConfirmDestroy: 'checkout/deleteModel'
  })
}
</script>
