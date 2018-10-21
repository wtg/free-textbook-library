<template>
  <table class="table table-hover">

    <!-- Table Header -->
    <thead>
      <th>Slug</th>
      <th>
        Status
        <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom title="The current status of this Book - only editable by the server." ></i>
      </th>
      <th>Book Type</th>
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
      </tr>

      <tr v-for="m in collection" :key="m._id">
        <td>
          <router-link :to=" '/books/' + m._id ">
            {{ m.slug }}
          </router-link>
        </td>
        <td>{{m.status}}</td>
        <td v-if="m.book_type_id">
          <router-link :to="'/book_types/' + m.book_type_id">
            {{m.book_type.title}}
          </router-link>
        </td>
        <td v-else></td>
        <!-- Edit Book-->
        <td class='text-right'>
          <b-button size="sm" variant="outline-primary" :to=" '/books/' + m._id">
            <i class="fa fa-fw fa-eye"></i>
          </b-button>

          <b-button size="sm" variant="outline-warning" :to=" '/books/' + m._id + '/edit' ">
            <i class="fa fa-fw fa-pencil"></i>
          </b-button>

          <b-button size="sm" variant="outline-danger" v-b-modal="'modal_' + m._id">
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

          <!-- Bootstrap Modal Component -->
          <b-modal :id="'modal_' + m._id"
            :title="'Destroy Book?'"
            @ok="onConfirmDestroy(m)"
            ok-variant='danger'
            ok-title='DESTROY'
            cancel-title='Cancel'
          >
            <p class="text-left">Are you sure you want to destroy this Book?</p>
          </b-modal>

        </td>
      </tr>
    </tbody>

  </table>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['collection'],
  methods: mapActions({
    onConfirmDestroy: 'book/deleteModel'
  })
}
</script>

