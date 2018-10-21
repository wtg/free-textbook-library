<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>
    <div class="row">
      <div class="col-lg-3">
        <BookType :model="book_type" v-if="book_type._id" />
      </div>

      <div class="col-lg-9">
        <BookShowWidget :model="model" :fetching="fetching" />
        <Checkouts :collection="checkouts" />
      </div>

    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import BookShowWidget from '@/modules/book/components/BookShowWidget'
import BookType from '@/modules/book/components/BookType'
import Checkouts from '@/modules/book/components/Checkouts'

export default {
  props: ['id'],
  name: 'book_show',
  metaInfo: {
    title: 'Books - Show'
  },
  components: {
    BookType,
    Checkouts,
    BookShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
    this.fetchBookType(this.id)
    this.fetchCheckouts(this.id)
  },
  methods: mapActions({
    fetchBookType: 'book/fetchBookType',
    fetchCheckouts: 'book/fetchCheckouts',
    fetch: 'book/fetchModel',
    onConfirmDestroy: 'book/deleteModel'
  }),
  computed: mapGetters({
    book_type: 'book/book_type',
    checkouts: 'book/checkouts',
    model: 'book/model',
    fetching: 'book/fetching'
  })
}
</script>
