<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <BookTypeShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      <div class="col-lg-12">
        <Books :collection="books" />
      </div>

    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import BookTypeShowWidget from '@/modules/book_type/components/BookTypeShowWidget'
import Books from '@/modules/book_type/components/Books'

export default {
  props: ['id'],
  name: 'book_type_show',
  metaInfo: {
    title: 'Book Types - Show'
  },
  components: {
    Books,
    BookTypeShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
    this.fetchBooks(this.id)
  },
  methods: mapActions({
    fetchBooks: 'book_type/fetchBooks',
    fetch: 'book_type/fetchModel',
    onConfirmDestroy: 'book_type/deleteModel'
  }),
  computed: mapGetters({
    books: 'book_type/books',
    model: 'book_type/model',
    fetching: 'book_type/fetching'
  })
}
</script>
