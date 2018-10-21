
<template>
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead">Checkouts</p>
      <table class="table table-hover">

        <!-- Table Header -->
        <thead>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Status</th>
          <th>Check Out Librarian</th>
          <th>Check In Librarian</th>
          <th>Renter</th>
          <th>Book</th>
          <th></th>
        </thead>

        <!-- Table Body -->
        <tbody>

          <!-- Empty Table Row -->
          <tr class='table-warning' v-if="!collection[0]">
            <td>Empty</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr v-for="m in collection" :key="m._id">
            <td>{{m.start_date}}</td>
            <td>{{m.end_date}}</td>
            <td>{{m.status}}</td>

            <td>
              <router-link :to="'/users/' + m.check_out_librarian_id">
                {{m.check_out_librarian.email}}
              </router-link>
            </td>
            <td>
              <router-link :to="'/users/' + m.check_in_librarian_id">
                {{m.check_in_librarian.email}}
              </router-link>
            </td>
            <td>
              <router-link :to="'/users/' + m.renter_id">
                {{m.renter.email}}
              </router-link>
            </td>
            <td>
              <router-link :to="'/books/' + m.book_id">
                {{m.book.slug}}
              </router-link>
            </td>
            <!-- Edit Checkout-->
            <td class='text-right'>
              <b-button size="sm" variant="outline-primary" :to=" '/checkouts/' + m._id">
                <i class="fa fa-fw fa-eye"></i>
              </b-button>

              <b-button size="sm" variant="outline-warning" :to=" '/checkouts/' + m._id + '/edit' ">
                <i class="fa fa-fw fa-pencil"></i>
              </b-button>

              <b-button size="sm" variant="outline-danger" v-b-modal="'modal_' + m._id">
                <i class="fa fa-fw fa-trash"></i>
              </b-button>

              <!-- Bootstrap Modal Component -->
              <b-modal :id="'modal_' + m._id"
                :title="'Destroy Checkout?'"
                @ok="onConfirmDestroy(m)"
                ok-variant='danger'
                ok-title='DESTROY'
                cancel-title='Cancel'
              >
                <p class="text-left">Are you sure you want to destroy this Checkout?</p>
              </b-modal>

            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['collection'],
  methods: mapActions({
    onConfirmDestroy: 'checkout/deleteModel'
  })
}
</script>
