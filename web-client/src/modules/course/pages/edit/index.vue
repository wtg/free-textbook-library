<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>
    <div class="row">
      <div class="col-sm-12">
        <h2>Course - Edit</h2>
      </div>
    </div>

    <hr>

    <CourseForm :model="model" />

    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button variant="secondary" to="/courses" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Update Course
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import CourseForm from '@/modules/course/components/CourseForm'

export default {
  props: ['id'],
  name: 'course_edit',
  metaInfo: {
    title: 'Course - Edit'
  },
  components: {
    LoadingFull,
    CourseForm
  },
  data () {
    return {
      fetching: false
    }
  },
  created () {
    this.fetching = true
    this.fetchEditModel(this.id)
    .then(() => this.fetching = false)
  },
  computed: mapGetters({
    model: 'course/editModel'
    // fetching: 'course/fetching'
  }),
  methods: mapActions({
    fetchEditModel: 'course/fetchEditModel',
    formSubmit: 'course/updateModel'
  })
}
</script>
