<template>
  <table class="table table-hover">

    <!-- Table Header -->
    <thead>
      <th>Status</th>
      <th>Start Date</th>
      <th>End Date</th>
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
        <td>{{m.status}}</td>
        <td>{{m.start_date}}</td>
        <td>{{m.end_date}}</td>
        <td v-if="m.check_out_librarian_id">
          <router-link :to="'/users/' + m.check_out_librarian_id">
            {{m.check_out_librarian.email}}
          </router-link>
        </td>
        <td v-else></td>
        <td v-if="m.check_in_librarian_id">
          <router-link :to="'/users/' + m.check_in_librarian_id">
            {{m.check_in_librarian.email}}
          </router-link>
        </td>
        <td v-else></td>
        <td v-if="m.renter_id">
          <router-link :to="'/users/' + m.renter_id">
            {{m.renter.email}}
          </router-link>
        </td>
        <td v-else></td>
        <td v-if="m.book_id">
          <router-link :to="'/books/' + m.book_id">
            {{m.book.slug}}
          </router-link>
        </td>
        <td v-else></td>

        <td class='text-right'>
          <b-button size="sm" variant="outline-primary" :to=" '/checkouts/' + m._id">
            <i class="fa fa-fw fa-eye"></i>
          </b-button>
        </td>
      </tr>
    </tbody>

  </table>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['collection']
}
</script>

