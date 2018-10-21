<template>
  <div class="card mb-3">
    <router-link :to=" '/book_types/' + model._id ">
      <img class="card-img-top" :src="model.image_url" style="width: 100%;" />
    </router-link>
    <!-- <img class="card-img-top" :src="model.image_url" height="100%" alt="Card image cap"> -->
    <div class="card-body">
      <td>{{model.title}}</td>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapActions } from 'vuex'

export default {
  props: ['model']
}
</script>
