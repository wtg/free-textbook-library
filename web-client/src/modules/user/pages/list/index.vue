<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <div class="row">
      <div class="col-md-9">
        <h2>
          <i class="fa fa-user"></i>
          Users
        </h2>
      </div>

      <div class="col-md-3 text-right">
        <b-button block variant="primary" to="/users/new">
          <i class="fa fa-fw fa-plus"></i>
          New User
        </b-button>
      </div>
    </div>

    <!-- List View -->
    <div class="row">
      <div class="col-lg-12">
        <SearchBar module='user'/>
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

import ListView from '@/modules/user/components/UserListWidget'
import LoadingFull from '@/components/LoadingFull'
import SearchBar from '@/components/SearchBar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'UserList',
  components: {
    LoadingFull,
    ListView,
    SearchBar
  },
  metaInfo: {
    title: 'Users'
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: 'user/fetching',
    collection: 'user/collection',
    totalRows: 'user/count',
    perPage: 'user/pageSize',
    currentPage: 'user/currentPage'
  }),
  methods: mapActions({
    fetch: 'user/fetchCollection',
    goToPage: 'user/goToPage'
  })
}
</script>
