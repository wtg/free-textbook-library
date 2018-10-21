<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>
    <div class="row">
      <div class="col-sm-12">
        <h2>Checkout - Edit</h2>
      </div>
    </div>

    <hr>

    <CheckoutForm :model="model" />

    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button variant="secondary" to="/checkouts" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Update Checkout
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import CheckoutForm from '@/modules/checkout/components/CheckoutForm'

export default {
  props: ['id'],
  name: 'checkout_edit',
  metaInfo: {
    title: 'Checkout - Edit'
  },
  components: {
    LoadingFull,
    CheckoutForm
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
    model: 'checkout/editModel'
    // fetching: 'checkout/fetching'
  }),
  methods: mapActions({
    fetchEditModel: 'checkout/fetchEditModel',
    formSubmit: 'checkout/updateModel'
  })
}
</script>
