<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <CourseShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      <div class="col-lg-12" v-if="required_books[0]">
        <!-- <RequiredBooks :collection="required_books" /> -->
        <RecommendedBooks type="Required" :collection="required_books" />
      </div>

      <div class="col-lg-12" v-if="recommended_books[0]">
        <RecommendedBooks type="Recommended" :collection="recommended_books" />
      </div>

    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import CourseShowWidget from '@/modules/course/components/CourseShowWidget'
import RequiredBooks from '@/modules/course/components/RequiredBooks'
import RecommendedBooks from '@/modules/course/components/RecommendedBooks'

export default {
  props: ['id'],
  name: 'course_show',
  metaInfo: {
    title: 'Courses - Show'
  },
  components: {
    RequiredBooks,
    RecommendedBooks,
    CourseShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
    this.fetchRequiredBooks(this.id)
    this.fetchRecommendedBooks(this.id)
  },
  methods: mapActions({
    fetchRequiredBooks: 'course/fetchRequiredBooks',
    fetchRecommendedBooks: 'course/fetchRecommendedBooks',
    fetch: 'course/fetchModel',
    onConfirmDestroy: 'course/deleteModel'
  }),
  computed: mapGetters({
    required_books: 'course/required_books',
    recommended_books: 'course/recommended_books',
    model: 'course/model',
    fetching: 'course/fetching'
  })
}
</script>
