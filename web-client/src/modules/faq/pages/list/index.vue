<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <div class="row">
      <div class="col-md-8">
        <h2>
          <i class="fa fa-square-o"></i>
          Faqs
        </h2>
      </div>

      <div class="col-md-4 text-right">
        <b-button variant="primary" to="/faqs/new">
          <i class="fa fa-fw fa-plus"></i>
          New Faq
        </b-button>
      </div>
    </div>

    <!-- List View -->
    <div class="row">
      <div class="col-lg-12">
        <SearchBar module='faq'/>
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

import ListView from '@/modules/faq/components/FaqListWidget'
import LoadingFull from '@/components/LoadingFull'
import SearchBar from '@/components/SearchBar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FaqList',
  components: {
    LoadingFull,
    ListView,
    SearchBar
  },
  metaInfo: {
    title: 'Faqs'
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: 'faq/fetching',
    collection: 'faq/collection',
    totalRows: 'faq/count',
    perPage: 'faq/pageSize',
    currentPage: 'faq/currentPage'
  }),
  methods: mapActions({
    fetch: 'faq/fetchCollection',
    goToPage: 'faq/goToPage'
  })
}
</script>
