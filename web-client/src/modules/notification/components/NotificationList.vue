<template>
  <transition-group name="list" tag='div' class="container notification-container">
    <div class="row" v-for="each in collection" v-bind:key="each.id">
      <NotificationChild :item="each"/>
    </div>
  </transition-group>
</template>

<!-- // // // //  -->

<script>
import NotificationChild from './NotificationChild'

export default {
  computed: {
    collection () {
      return this.$store.getters['notification/collection']
    }
  },
  components: {
    NotificationChild
  }
}
</script>

<!-- // // // //  -->

<!-- QUESTION - SCOPED? -->
<style lang='sass'>
  // @import '../../../sass/app.sass'

  .container.notification-container
    position: absolute
    bottom: 0
    right: 0

  .list-enter-active, .list-leave-active
    transition: opacity .5s

  .list-enter, .list-leave-to
     opacity: 0

</style>
