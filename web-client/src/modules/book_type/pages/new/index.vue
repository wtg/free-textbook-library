<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h2>Book Type - New</h2>
      </div>
    </div>

    <hr>

    <BookTypeForm :model="model" />
    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button to="/book_types" variant="light" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Create Book Type
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import BookTypeForm from '@/modules/book_type/components/BookTypeForm'

export default {
  name: 'BookTypeNew',
  metaInfo: {
    title: 'Book Type - New'
  },
  components: {
    BookTypeForm
  },
  created () {
    this.resetNewModel()
  },
  computed: mapGetters({
    model: 'book_type/newModel'
  }),
  methods: {
    ...mapActions({
      formSubmit: 'book_type/createModel'
    }),
    ...mapMutations({
      resetNewModel: 'book_type/resetNewModel'
    })
  }
}
</script>
