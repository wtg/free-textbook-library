<template>
  <table class="table table-hover">

    <!-- Table Header -->
    <thead>
      <th>Label</th>
      <th>Subject Code</th>
      <th>Course Number</th>
      <th>Required Books</th>
      <th>Recommended Books</th>
      <th></th>
    </thead>

    <!-- Table Body -->
    <tbody>

      <!-- Empty Table Row -->
      <tr class='table-warning' v-if="!collection[0]">
        <td>Empty</td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>

      <tr v-for="m in collection" :key="m._id">
        <td>{{m.label}}</td>
        <td>{{m.subject_code}}</td>
        <td>{{m.course_number}}</td>
        <td v-if="m.required_book_ids">
          {{ m.required_book_ids.length }} Required Books
        </td>
        <td v-else>
          None
        </td>
        <td v-if="m.recommended_book_ids">
          {{ m.recommended_book_ids.length }} Recommended Books
        </td>
        <td v-else>
          None
        </td>
        <!-- Edit Course-->
        <td class='text-right'>
          <b-button size="sm" variant="outline-primary" :to=" '/courses/' + m._id">
            <i class="fa fa-fw fa-eye"></i>
          </b-button>

          <b-button size="sm" variant="outline-warning" :to=" '/courses/' + m._id + '/edit' ">
            <i class="fa fa-fw fa-pencil"></i>
          </b-button>

          <b-button size="sm" variant="outline-danger" v-b-modal="'modal_' + m._id">
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

          <!-- Bootstrap Modal Component -->
          <b-modal :id="'modal_' + m._id"
            :title="'Destroy Course?'"
            @ok="onConfirmDestroy(m)"
            ok-variant='danger'
            ok-title='DESTROY'
            cancel-title='Cancel'
          >
            <p class="text-left">Are you sure you want to destroy this Course?</p>
          </b-modal>

        </td>
      </tr>
    </tbody>

  </table>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['collection'],
  methods: mapActions({
    onConfirmDestroy: 'course/deleteModel'
  })
}
</script>

