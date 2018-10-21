
<template>
  <div class="card mb-3">
    <div class="card-body">

      <!-- Bootstrap Modal Component -->
      <b-modal
        v-if="isAdmin"
        :id="'destroyModal'"
        :title="'Destroy Course?'"
        @ok="onConfirmDestroy(model)"
        ok-variant='danger'
        ok-title='DESTROY'
        cancel-title='Cancel'
        cancel-variant='light'
      >
        <p class="text-left">Are you sure you want to destroy this Course?</p>
      </b-modal>

      <div class="row">
        <div class="col-sm-8">
          <h4>{{ model.label }}</h4>
          <p class="lead text-muted">{{model.subject_code}} {{model.course_number}}</p>
        </div>
        <div class="col-sm-4 text-right">

          <!-- Edit -->
          <b-button v-if="isAdmin" size="sm" variant="outline-warning" :to="'/courses/' + model._id + '/edit'">
            <i class="fa fa-fw fa-pencil"></i>
          </b-button>

          <!-- Destroy -->
          <b-button v-if="isAdmin" size="sm" variant="outline-danger" v-b-modal="'destroyModal'">
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

        </div>
      </div>

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
  }),
  computed: mapGetters({
    isAdmin: 'auth/isAdmin'
  })
}
</script>
