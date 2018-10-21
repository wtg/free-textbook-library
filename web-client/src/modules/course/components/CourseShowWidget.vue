
<template>
  <div class="card mb-3">
    <div class="card-body">

      <!-- Bootstrap Modal Component -->
      <b-modal :id="'destroyModal'"
        :title="'Destroy Course?'"
        @ok="onConfirmDestroy(model)"
        header-bg-variant='dark'
        header-text-variant='light'
        body-bg-variant='dark'
        body-text-variant='light'
        footer-bg-variant='danger'
        footer-text-variant='light'
        ok-variant='danger'
        ok-title='DESTROY'
        cancel-title='Cancel'
        cancel-variant='dark'
      >
        <p class="text-left">Are you sure you want to destroy this Course?</p>
      </b-modal>

      <div class="row">
        <div class="col-sm-8">
          <h2>
            {{ header || 'Course Detail' }}
          </h2>
        </div>
        <div class="col-sm-4 text-right">

          <!-- Edit -->
          <b-button size="sm" variant="outline-warning" :to="'/courses/' + model._id + '/edit'">
            <i class="fa fa-fw fa-pencil"></i>
          </b-button>

          <!-- Destroy -->
          <b-button size="sm" variant="outline-danger" v-b-modal="'destroyModal'">
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

        </div>
      </div>

      <table class="table" v-if='!fetching'>

        <!-- Table Header -->
        <tbody>
          <tr>
            <td>Label</td>
            <td>{{model.label}}</td>
          </tr>
          <tr>
            <td>Subject Code</td>
            <td>{{model.subject_code}}</td>
          </tr>
          <tr>
            <td>Course Number</td>
            <td>{{model.course_number}}</td>
          </tr>
          <tr>
            <td>Required Books</td>
            <td>{{model.required_book_ids.length }} Required Books</td>
          </tr>
          <tr>
            <td>Recommended Books</td>
            <td>{{model.recommended_book_ids.length }} Recommended Books</td>
          </tr>
        </tbody>

      </table>
      <Loading v-else />

    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import Loading from '@/components/Loading'

export default {
  props: ['id', 'model', 'fetching', 'header'],
  name: 'CourseShowWidget',
  components: {
    Loading
  },
  methods: mapActions({
    onConfirmDestroy: 'course/deleteModel'
  })
}
</script>
