
<template>
  <div class="card mb-3">
    <div class="card-body">

      <!-- Bootstrap Modal Component -->
      <b-modal :id="'destroyModal'"
        :title="'Destroy Faq?'"
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
        <p class="text-left">Are you sure you want to destroy this Faq?</p>
      </b-modal>

      <div class="row">
        <div class="col-sm-8">
          <h2>
            {{ header || 'Faq Detail' }}
          </h2>
        </div>
        <div class="col-sm-4 text-right">

          <!-- Edit -->
          <b-button size="sm" variant="outline-warning" :to="'/faqs/' + model._id + '/edit'">
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
            <td>Question</td>
            <td>{{model.question}}</td>
          </tr>
          <tr>
            <td>Answer</td>
            <td>{{model.answer}}</td>
          </tr>
          <tr>
            <td>Order</td>
            <td>{{model.order}}</td>
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
  name: 'FaqShowWidget',
  components: {
    Loading
  },
  methods: mapActions({
    onConfirmDestroy: 'faq/deleteModel'
  })
}
</script>
