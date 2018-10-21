
<template>
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead">Inventory</p>
      <table class="table table-hover">

        <!-- Table Header -->
        <thead>
          <!-- <th>Slug</th> -->
          <th>
            Status
            <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="The current status of the Book" ></i>
          </th>
          <!-- <th>Book Type</th> -->
          <th></th>
        </thead>

        <!-- Table Body -->
        <tbody>

          <!-- Empty Table Row -->
          <tr class='table-warning' v-if="!collection[0]">
            <!-- <td></td> -->
            <td>Empty</td>
            <td></td>
            <td></td>
          </tr>

          <tr v-for="m in collection" :key="m._id">
            <!-- <td> -->
              <!-- {{ m.slug }} -->
              <!-- <router-link :to=" '/books/' + m._id "> -->
              <!-- </router-link> -->
            <!-- </td> -->
            <td>{{m.status}}</td>

            <!-- <td> -->
              <!-- <router-link :to="'/book_types/' + m.book_type_id"> -->
                <!-- {{m.book_type.title}} -->
              <!-- </router-link> -->
            <!-- </td> -->

            <!-- Edit Book-->
            <td class='text-right'>
              <b-button size="sm" variant="outline-primary" :to=" '/books/' + m._id" v-if="isAdmin">
                <i class="fa fa-fw fa-shopping-cart"></i>
                Checkout
              </b-button>

              <!-- <b-button size="sm" variant="outline-warning" :to=" '/books/' + m._id + '/edit' "> -->
                <!-- <i class="fa fa-fw fa-pencil"></i> -->
              <!-- </b-button> -->

            </td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['collection'],
  computed: mapGetters({
    isAdmin: 'auth/isAdmin'
  })
}
</script>
