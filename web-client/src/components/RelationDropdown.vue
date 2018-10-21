<template>
  <div class="form-group">
    <label class='mb-0' :v-if="label" :for="'exampleInput' + label">{{label}}</label>
    <small :v-if="help" :id="name + 'Help'" class="mb-2 form-text text-muted">{{ help }}</small>
    <select :value="value" ref="select" :multiple="multiple" v-on:input="updateValue($event.target.value)" :type="type" class="form-control" :id="'exampleInput' + label" :aria-describedby="name + 'Help'" :placeholder="placeholder">
      <option :value="" v-for="opt in "
    </select>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'FormInput',
  props: [ 'name', 'label', 'type', 'placeholder', 'multiple', 'help', 'value', 'collectionGetter', 'collectionAction' ],
  mounted () {
    if (this.collectionAction) return this.fetchCollection()
  },
  computed: {
    collection () {
      return this.$store.getters[this.collectionGetter]
    }
  },
  methods: {
    fetchCollection () {
      return this.store.dispatch(this.collectionAction)
    },
    // Propagates the input event
    updateValue (value) {
      // TODO - handle different types of inputs
      // If the value was not already normalized,
      // manually override it to conform
      this.$refs.input.value = value
      // Emit the number value through the input event
      // TODO - handle Number input
      this.$emit('input', value)
    }
  }
}
</script>
