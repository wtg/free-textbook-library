<template>
  <div class="container">

    <div class="row">
      <div class="col-sm-12">
        <h2>Faq - New</h2>
      </div>
    </div>

    <hr>

    <FaqForm :model="model" />
    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button to="/faqs" variant="light" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Create Faq
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import FaqForm from '@/modules/faq/components/FaqForm'

export default {
  name: 'FaqNew',
  metaInfo: {
    title: 'Faq - New'
  },
  components: {
    FaqForm
  },
  created () {
    this.resetNewModel()
  },
  computed: mapGetters({
    model: 'faq/newModel'
  }),
  methods: {
    ...mapActions({
      formSubmit: 'faq/createModel'
    }),
    ...mapMutations({
      resetNewModel: 'faq/resetNewModel'
    })
  }
}
</script>
