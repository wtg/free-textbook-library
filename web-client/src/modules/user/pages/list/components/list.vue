
<template>
  <div class='row'>
    <div v-for="m in collection" class='col-lg-12 mt-2'>
      <div class="card card-body bg-light">
        <a :to="'/users/' + m._id">{{m.email}}</a>
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['collection']
}
</script>
