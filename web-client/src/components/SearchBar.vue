<template>
  <div class="row mb-3">
    <div class="col-lg-9 pr-0">
      <input class="form-control" @input="setFilter($event.target.value)" :value="filter" placeholder="Search"></input>
    </div>

    <div class="col-lg-3">
      <button class="btn btn-warning btn-block mr-2" @click='clearFilter()'>
        <i class="fa fa-search mr-2"></i>
        Clear Search
      </button>
      <i class="fa fa-spin fa-spinner" v-if="fetching"></i>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['module'],
  beforeCreate () {
    // Isolates the 'module' prop
    let module = this.$options.propsData.module

    // Defines Vue.component.computed
    this.$options.computed = mapGetters({
      filter: `${module}/filter`,
      fetching: `${module}/fetching`
    })

    // Defines Vue.component.methods
    this.$options.methods = mapActions({
      clearFilter: `${module}/clearFilter`,
      setFilter: `${module}/setFilter`
    })
  }
}
</script>

<style lang="sass">
  i.fa-hover
    cursor: pointer
    &:hover
      color: darken(#f3f3f3, 15%)
</style>
