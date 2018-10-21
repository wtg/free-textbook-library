<template>
  <div class="container">

    <div class="row">
      <div class="col-md-9">
        <h2>
          <i class="fa fa-book"></i>
          Books
        </h2>
      </div>

      <div class="col-md-3 text-right">
        <b-button variant="primary" block to="/book_types/new" v-if="isAdmin">
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
      <!-- <div class="col-lg-12"> -->
        <!-- <b-pagination :total-rows="totalRows" :value="currentPage" :per-page="perPage" @change="goToPage" /> -->
      <!-- </div> -->
      <div class="col-lg-12">
        <Loading v-if="fetching" />
        <ListView v-else :collection="collection" />
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>

import ListView from '@/modules/book_type/components/BookTypeListWidget'
import Loading from '@/components/Loading'
import SearchBar from '@/components/SearchBar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BookTypeList',
  components: {
    Loading,
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
    currentPage: 'book_type/currentPage',
    isAdmin: 'auth/isAdmin'
  }),
  methods: mapActions({
    fetch: 'book_type/fetchCollection',
    goToPage: 'book_type/goToPage'
  })
}
</script>
