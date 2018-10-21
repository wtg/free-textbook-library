<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <UserShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      <div class="col-lg-12">
        <Rentals :collection="rentals" />
      </div>

    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import UserShowWidget from '@/modules/user/components/UserShowWidget'
import Rentals from '@/modules/user/components/Rentals'

export default {
  props: ['id'],
  name: 'user_show',
  metaInfo: {
    title: 'Users - Show'
  },
  components: {
    Rentals,
    UserShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.$store.getters['auth/current_user']._id)
    this.fetchRentals(this.$store.getters['auth/current_user']._id)
  },
  methods: mapActions({
    fetchRentals: 'user/fetchRentals',
    fetch: 'user/fetchModel',
    onConfirmDestroy: 'user/deleteModel'
  }),
  computed: mapGetters({
    rentals: 'user/rentals',
    model: 'user/model',
    fetching: 'user/fetching'
  })
}
</script>
