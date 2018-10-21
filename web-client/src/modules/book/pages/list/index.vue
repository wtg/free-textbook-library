<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <div class="row">
      <div class="col-md-8">
        <h2>
          <i class="fa fa-square-o"></i>
          Books
        </h2>
      </div>

      <div class="col-md-4 text-right">
        <b-button variant="primary" to="/books/new">
          <i class="fa fa-fw fa-plus"></i>
          New Book
        </b-button>
      </div>
    </div>

    <!-- List View -->
    <div class="row">
      <div class="col-lg-12">
        <SearchBar module='book'/>
      </div>
      <div class="col-lg-12">
        <b-pagination :total-rows="totalRows" :value="currentPage" :per-page="perPage" @change="goToPage" />
      </div>
      <div class="col-lg-12">
        <ListView :collection="collection" />
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>

import ListView from '@/modules/book/components/BookListWidget'
import LoadingFull from '@/components/LoadingFull'
import SearchBar from '@/components/SearchBar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BookList',
  components: {
    LoadingFull,
    ListView,
    SearchBar
  },
  metaInfo: {
    title: 'Books'
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: 'book/fetching',
    collection: 'book/collection',
    totalRows: 'book/count',
    perPage: 'book/pageSize',
    currentPage: 'book/currentPage'
  }),
  methods: mapActions({
    fetch: 'book/fetchCollection',
    goToPage: 'book/goToPage'
  })
}
</script>
