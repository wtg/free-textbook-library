<template>
  <button class="btn btn-outline-success" @click="click()">
    <i class="fa fa-fw fa-check mr-2"></i>
    Submit
  </button>
</template>

<script>
export default {
  name: 'FormSubmit',
  props: ['click', 'label', 'icon', 'context']
}
</script>

