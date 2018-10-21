
<template>
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead">Required Books</p>
      <table class="table table-hover">

        <!-- Table Header -->
        <thead>
          <th>Title</th>
          <th>Edition</th>
          <th>ISBN 13</th>
          <th>ISBN 10</th>
          <th>Authors</th>
          <th>List Price</th>
          <th>Image URL</th>
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
            <td>{{m.title}}</td>
            <td>{{m.edition}}</td>
            <td>
              <router-link :to=" '/book_types/' + m._id ">
                {{ m.isbn_13 }}
              </router-link>
            </td>
            <td>
              <router-link :to=" '/book_types/' + m._id ">
                {{ m.isbn_10 }}
              </router-link>
            </td>
            <td>{{ m.authors.join(', ') }}</td>
            <td>{{m.list_price}}</td>
            <td>{{m.image_url}}</td>

            <!-- Edit Book Type-->
            <td class='text-right'>
              <b-button size="sm" variant="outline-primary" :to=" '/book_types/' + m._id">
                <i class="fa fa-fw fa-eye"></i>
              </b-button>

              <b-button size="sm" variant="outline-warning" :to=" '/book_types/' + m._id + '/edit' ">
                <i class="fa fa-fw fa-pencil"></i>
              </b-button>

              <b-button size="sm" variant="outline-danger" v-b-modal="'modal_' + m._id">
                <i class="fa fa-fw fa-trash"></i>
              </b-button>

              <!-- Bootstrap Modal Component -->
              <b-modal :id="'modal_' + m._id"
                :title="'Destroy Book Type?'"
                @ok="onConfirmDestroy(m)"
                ok-variant='danger'
                ok-title='DESTROY'
                cancel-title='Cancel'
              >
                <p class="text-left">Are you sure you want to destroy this Book Type?</p>
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
    onConfirmDestroy: 'book_type/deleteModel'
  })
}
</script>
