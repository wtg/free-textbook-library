<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <div class="row">
      <div class="col-md-8">
        <h2>
          <i class="fa fa-square-o"></i>
          Courses
        </h2>
      </div>

      <div class="col-md-4 text-right">
        <b-button variant="primary" to="/courses/new">
          <i class="fa fa-fw fa-plus"></i>
          New Course
        </b-button>
      </div>
    </div>

    <!-- List View -->
    <div class="row">
      <div class="col-lg-12">
        <SearchBar module='course'/>
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

import ListView from '@/modules/course/components/CourseListWidget'
import LoadingFull from '@/components/LoadingFull'
import SearchBar from '@/components/SearchBar'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CourseList',
  components: {
    LoadingFull,
    ListView,
    SearchBar
  },
  metaInfo: {
    title: 'Courses'
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: 'course/fetching',
    collection: 'course/collection',
    totalRows: 'course/count',
    perPage: 'course/pageSize',
    currentPage: 'course/currentPage'
  }),
  methods: mapActions({
    fetch: 'course/fetchCollection',
    goToPage: 'course/goToPage'
  })
}
</script>
