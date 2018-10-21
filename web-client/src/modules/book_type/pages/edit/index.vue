<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>
    <div class="row">
      <div class="col-sm-12">
        <h2>Book Type - Edit</h2>
      </div>
    </div>

    <hr>

    <BookTypeForm :model="model" />

    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button variant="secondary" to="/book_types" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Update Book Type
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import BookTypeForm from '@/modules/book_type/components/BookTypeForm'

export default {
  props: ['id'],
  name: 'book_type_edit',
  metaInfo: {
    title: 'Book Type - Edit'
  },
  components: {
    LoadingFull,
    BookTypeForm
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
    model: 'book_type/editModel'
    // fetching: 'book_type/fetching'
  }),
  methods: mapActions({
    fetchEditModel: 'book_type/fetchEditModel',
    formSubmit: 'book_type/updateModel'
  })
}
</script>
