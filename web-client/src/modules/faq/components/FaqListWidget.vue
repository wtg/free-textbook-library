<template>
  <table class="table table-hover">

    <!-- Table Header -->
    <thead>
      <th>Question</th>
      <th>Answer</th>
      <th>Order</th>
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
      </tr>

      <tr v-for="m in collection" :key="m._id">
        <td>{{m.question}}</td>
        <td>{{m.answer}}</td>
        <td>{{m.order}}</td>
        <!-- Edit Faq-->
        <td class='text-right'>
          <b-button size="sm" variant="outline-primary" :to=" '/faqs/' + m._id">
            <i class="fa fa-fw fa-eye"></i>
          </b-button>

          <b-button size="sm" variant="outline-warning" :to=" '/faqs/' + m._id + '/edit' ">
            <i class="fa fa-fw fa-pencil"></i>
          </b-button>

          <b-button size="sm" variant="outline-danger" v-b-modal="'modal_' + m._id">
            <i class="fa fa-fw fa-trash"></i>
          </b-button>

          <!-- Bootstrap Modal Component -->
          <b-modal :id="'modal_' + m._id"
            :title="'Destroy Faq?'"
            @ok="onConfirmDestroy(m)"
            ok-variant='danger'
            ok-title='DESTROY'
            cancel-title='Cancel'
          >
            <p class="text-left">Are you sure you want to destroy this Faq?</p>
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
    onConfirmDestroy: 'faq/deleteModel'
  })
}
</script>

