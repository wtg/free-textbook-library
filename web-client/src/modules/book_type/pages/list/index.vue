<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <div class="row">
      <div class="col-md-8">
        <h2>
          <i class="fa fa-square-o"></i>
          Book Types
        </h2>
      </div>

      <div class="col-md-4 text-right">
        <b-button variant="primary" to="/book_types/new">
          <i class="fa fa-fw fa-plus"></i>
          New Book Type
        </b-button>
      </div>
    </div>

    <!-- List View -->
    <div class="row">
      <div class="col-lg-12">
        <SearchBar module='book_type'/>
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

import ListView from '@/modules/book_type/components/BookTypeListWidget'
import LoadingFull from '@/components/LoadingFull'
import SearchBar from '@/components/SearchBar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BookTypeList',
  components: {
    LoadingFull,
    ListView,
    SearchBar
  },
  metaInfo: {
    title: 'Book Types'
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: 'book_type/fetching',
    collection: 'book_type/collection',
    totalRows: 'book_type/count',
    perPage: 'book_type/pageSize',
    currentPage: 'book_type/currentPage'
  }),
  methods: mapActions({
    fetch: 'book_type/fetchCollection',
    goToPage: 'book_type/goToPage'
  })
}
</script>
