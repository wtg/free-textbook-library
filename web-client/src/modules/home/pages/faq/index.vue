<template>
  <LoadingFull v-if="fetching" />
  <div class="container-fluid" v-else>
    <div class="row h-100 align-items-center">
      <div class="col-lg-12">

        <div class="row">
          <div class="col-lg-12 text-center">
            <h1 class='display-4' style="font-family: monospace;">ftl<i style='font-size:75%;' class="fa fa-heart text-danger mr-1"></i>FAQ</h1>
            <p class="mb-0">People ask us a lot of questions</p>
            <small>(we're kinda a big deal)</small>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-lg-12 mb-2" v-for="faq in collection">
            <div class="card card-body">
              <span><strong>{{ faq.question }}</strong></span>
              <span>{{ faq.answer }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'

export default {
  name: 'About',
  metaInfo: {
    title: 'FAQs'
  },
  components: {
    LoadingFull
  },
  created () {
    return this.fetch()
  },
  computed: mapGetters({
    fetching: 'faq/fetching',
    collection: 'faq/collection'
  }),
  methods: mapActions({
    fetch: 'faq/fetchCollection'
  })
}
</script>
