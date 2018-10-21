<template>
  <div class="form-group">
    <label class='mb-0' :v-if="label" :for="'exampleInput' + label">{{label}}</label>
    <small :v-if="help" :id="name + 'Help'" class="mb-2 form-text text-muted">{{ help }}</small>
    <input :value="value" ref="input" v-on:input="updateValue($event.target.value)" :type="type" class="form-control" :id="'exampleInput' + label" :aria-describedby="name + 'Help'" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: [ 'name', 'label', 'type', 'placeholder', 'help', 'value' ],
  methods: {
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
