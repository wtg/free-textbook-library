<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>
    <div class="row">
      <div class="col-sm-12">
        <h2>Book - Edit</h2>
      </div>
    </div>

    <hr>

    <BookForm :model="model" />

    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button variant="secondary" to="/books" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Update Book
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import BookForm from '@/modules/book/components/BookForm'

export default {
  props: ['id'],
  name: 'book_edit',
  metaInfo: {
    title: 'Book - Edit'
  },
  components: {
    LoadingFull,
    BookForm
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
    model: 'book/editModel'
    // fetching: 'book/fetching'
  }),
  methods: mapActions({
    fetchEditModel: 'book/fetchEditModel',
    formSubmit: 'book/updateModel'
  })
}
</script>
