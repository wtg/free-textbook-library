<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h2>Course - New</h2>
      </div>
    </div>

    <hr>

    <CourseForm :model="model" />
    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button to="/courses" variant="light" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Create Course
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import CourseForm from '@/modules/course/components/CourseForm'

export default {
  name: 'CourseNew',
  metaInfo: {
    title: 'Course - New'
  },
  components: {
    CourseForm
  },
  created () {
    this.resetNewModel()
  },
  computed: mapGetters({
    model: 'course/newModel'
  }),
  methods: {
    ...mapActions({
      formSubmit: 'course/createModel'
    }),
    ...mapMutations({
      resetNewModel: 'course/resetNewModel'
    })
  }
}
</script>
