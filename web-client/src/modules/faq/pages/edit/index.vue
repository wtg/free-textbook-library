<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>
    <div class="row">
      <div class="col-sm-12">
        <h2>Faq - Edit</h2>
      </div>
    </div>

    <hr>

    <FaqForm :model="model" />

    <div class="row">
      <div class="col-lg-12 text-right">

        <b-button variant="secondary" to="/faqs" class="mr-2">
          <i class="fa fa-fw fa-times"></i>
          Cancel
        </b-button>

        <b-button variant="primary" @click="formSubmit(model)">
          <i class="fa fa-fw fa-plus"></i>
          Update Faq
        </b-button>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import FaqForm from '@/modules/faq/components/FaqForm'

export default {
  props: ['id'],
  name: 'faq_edit',
  metaInfo: {
    title: 'Faq - Edit'
  },
  components: {
    LoadingFull,
    FaqForm
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
    model: 'faq/editModel'
    // fetching: 'faq/fetching'
  }),
  methods: mapActions({
    fetchEditModel: 'faq/fetchEditModel',
    formSubmit: 'faq/updateModel'
  })
}
</script>
