<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <div class="row">
      <div class="col-md-12">
        <h2>
          <i class="fa fa-square-shopping-cart"></i>
          Checkouts
        </h2>
      </div>
    </div>

    <!-- List View -->
    <div class="row">
      <!-- <div class="col-lg-12"> -->
        <!-- <SearchBar module='checkout'/> -->
      <!-- </div> -->
      <!-- <div class="col-lg-12"> -->
        <!-- <b-pagination :total-rows="totalRows" :value="currentPage" :per-page="perPage" @change="goToPage" /> -->
      <!-- </div> -->
      <div class="col-lg-12">
        <ListView :collection="collection" />
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>

import ListView from '@/modules/checkout/components/CheckoutListWidget'
import LoadingFull from '@/components/LoadingFull'
import SearchBar from '@/components/SearchBar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CheckoutList',
  components: {
    LoadingFull,
    ListView,
    SearchBar
  },
  metaInfo: {
    title: 'Checkouts'
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: 'checkout/fetching',
    collection: 'checkout/collection',
    totalRows: 'checkout/count',
    perPage: 'checkout/pageSize',
    currentPage: 'checkout/currentPage'
  }),
  methods: mapActions({
    fetch: 'checkout/fetchCollection',
    goToPage: 'checkout/goToPage'
  })
}
</script>
