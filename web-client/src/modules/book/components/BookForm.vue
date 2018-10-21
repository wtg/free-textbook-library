<template>
  <div class='row'>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Slug
<span class='text-danger'>*</span>        </label>
        <input type="text" class="form-control" placeholder="Slug" v-model="model.slug">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Status
        </label>
        <small class="form-text text-muted mb-2">The current status of this Book - only editable by the server.</small>
        <input type="text" class="form-control" placeholder="Status" v-model="model.status">
      </div>
    </div>

    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Book Type
        </label>
        <select type="text" class="form-control" placeholder="Book Type" v-model="model.book_type_id">
          <option :value="book_type._id" v-for="book_type in book_types">
            {{ book_type.title }}
          </option>
        </select>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import InputTag from 'vue-input-tag'

export default {
  name: 'book_form',
  props: ['model'],
  components: {
    InputTag
  },
  created () {
    this.$store.dispatch('book_type/fetchCollection')
  },
  computed: {
    book_types () {
      return this.$store.getters['book_type/collection']
    },
  }
}
</script>
