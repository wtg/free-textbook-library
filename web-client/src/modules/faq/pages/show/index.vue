<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <FaqShowWidget :model="model" :fetching="fetching" />

    <div class="row">
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import FaqShowWidget from '@/modules/faq/components/FaqShowWidget'

export default {
  props: ['id'],
  name: 'faq_show',
  metaInfo: {
    title: 'Faqs - Show'
  },
  components: {
    FaqShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
  },
  methods: mapActions({
    fetch: 'faq/fetchModel',
    onConfirmDestroy: 'faq/deleteModel'
  }),
  computed: mapGetters({
    model: 'faq/model',
    fetching: 'faq/fetching'
  })
}
</script>
