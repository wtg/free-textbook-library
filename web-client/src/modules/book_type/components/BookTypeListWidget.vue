<template>
  <div class='row'>

    <!-- Empty -->
    <div class="col-lg-12 mb-4" v-if="!collection[0]">
      <div class="card card-body border-warning bg-transparent text-warning h-100 d-flex align-items-center justify-content-center text-center">
        <div class="row">
          <div class="col-lg-12">
            <p class="lead card-text">
              <i class="fa fa-fw fa-warning"></i>
              <br>
              No Books Found
            </p>
          </div>
          <div class="col-lg-12">
            <hr class='border-warning'>
          </div>
          <div class="col-lg-12">
            <small class="card-text">Search again for search for books by Course</small>
          </div>
        </div>
      </div>
    </div>

    <div class='col-lg-3' v-for="m in collection" :key="m._id">

      <div class='card'>
        <router-link :to=" '/book_types/' + m._id ">
          <img class="card-img-top" :src="m.image_url" style="width: 100%;" />
        </router-link>
        <div class="card-body">
          <router-link :to=" '/book_types/' + m._id ">
            {{m.title}}
          </router-link>
          <small>{{m.edition}}</small>
          <small>{{m.list_price}}</small>
        </div>
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
