
<template>
  <div class="card mb-3">
    <div class="card-body">

      <!-- Bootstrap Modal Component -->
      <b-modal :id="'destroyModal'"
        :title="'Destroy Book Type?'"
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
        <p class="text-left">Are you sure you want to destroy this Book Type?</p>
      </b-modal>

      <div class="row">
        <div class="col-sm-8">
          <h2>
            {{ header || 'Book Type Detail' }}
          </h2>
        </div>
        <div class="col-sm-4 text-right">

          <!-- Edit -->
          <b-button size="sm" variant="outline-warning" :to="'/book_types/' + model._id + '/edit'">
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
            <td>Title</td>
            <td>{{model.title}}</td>
          </tr>
          <tr>
            <td>Edition</td>
            <td>{{model.edition}}</td>
          </tr>
          <tr>
            <td>ISBN 13</td>
            <td>{{model.isbn_13}}</td>
          </tr>
          <tr>
            <td>ISBN 10</td>
            <td>{{model.isbn_10}}</td>
          </tr>
          <tr>
            <td>Authors</td>
            <td>{{model.authors.join(', ')}}</td>
          </tr>
          <tr>
            <td>List Price</td>
            <td>{{model.list_price}}</td>
          </tr>
          <tr>
            <td>Image URL</td>
            <td>{{model.image_url}}</td>
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
  name: 'BookTypeShowWidget',
  components: {
    Loading
  },
  methods: mapActions({
    onConfirmDestroy: 'book_type/deleteModel'
  })
}
</script>
