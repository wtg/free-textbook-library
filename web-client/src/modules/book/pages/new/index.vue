<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h2>Book - New</h2>
      </div>
    </div>

    <hr>

    <BookForm :model="model" />
    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button to="/books" variant="light" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Create Book
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BookForm from '@/modules/book/components/BookForm'

export default {
  name: 'BookNew',
  metaInfo: {
    title: 'Book - New'
  },
  components: {
    BookForm
  },
  created () {
    this.resetNewModel()
  },
  computed: mapGetters({
    model: 'book/newModel'
  }),
  methods: {
    ...mapActions({
      formSubmit: 'book/createModel'
    }),
    ...mapMutations({
      resetNewModel: 'book/resetNewModel'
    })
  }
}
</script>
