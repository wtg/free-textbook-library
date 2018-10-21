<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h2>Checkout - New</h2>
      </div>
    </div>

    <hr>

    <CheckoutForm :model="model" />
    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button to="/checkouts" variant="light" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Create Checkout
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import CheckoutForm from '@/modules/checkout/components/CheckoutForm'

export default {
  name: 'CheckoutNew',
  metaInfo: {
    title: 'Checkout - New'
  },
  components: {
    CheckoutForm
  },
  created () {
    this.resetNewModel()
  },
  computed: mapGetters({
    model: 'checkout/newModel'
  }),
  methods: {
    ...mapActions({
      formSubmit: 'checkout/createModel'
    }),
    ...mapMutations({
      resetNewModel: 'checkout/resetNewModel'
    })
  }
}
</script>
