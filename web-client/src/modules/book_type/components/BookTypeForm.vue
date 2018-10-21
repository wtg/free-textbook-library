<template>
  <div class='row'>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Title
<span class='text-danger'>*</span>        </label>
        <input type="text" class="form-control" placeholder="Title" v-model="model.title">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Edition
        </label>
        <input type="text" class="form-control" placeholder="Edition" v-model="model.edition">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          ISBN 13
<span class='text-danger'>*</span>        </label>
        <input type="text" class="form-control" placeholder="ISBN 13" v-model="model.isbn_13">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          ISBN 10
<span class='text-danger'>*</span>        </label>
        <input type="text" class="form-control" placeholder="ISBN 10" v-model="model.isbn_10">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Authors
<span class='text-danger'>*</span>        </label>
        <InputTag placeholder="Authors" :tags.sync="model.authors"/>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          List Price
<span class='text-danger'>*</span>        </label>
        <input type="number" class="form-control" placeholder="List Price" v-model="model.list_price">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Image URL
<span class='text-danger'>*</span>        </label>
        <input type="text" class="form-control" placeholder="Image URL" v-model="model.image_url">
      </div>
    </div>


  </div>
</template>

<!-- // // // //  -->

<script>
import InputTag from 'vue-input-tag'

export default {
  name: 'book_type_form',
  props: ['model'],
  components: {
    InputTag
  },
  created () {
  },
  computed: {
  }
}
</script>
