<template>
  <div class='row'>
    <div class="col-lg-8">
      <div class="form-group">
        <label class='mb-0'>
          Label
          <span class='text-danger'>*</span>
        </label>
        <input type="text" class="form-control" placeholder="Label" v-model="model.label">
      </div>
    </div>
    <div class="col-lg-2">
      <div class="form-group">
        <label class='mb-0'>
          Subject Code
          <span class='text-danger'>*</span>
        </label>
        <input type="text" class="form-control" placeholder="Subject Code" v-model="model.subject_code">
      </div>
    </div>
    <div class="col-lg-2">
      <div class="form-group">
        <label class='mb-0'>
          Course Number
          <span class='text-danger'>*</span>
        </label>
        <input type="number" class="form-control" placeholder="Course Number" v-model="model.course_number">
      </div>
    </div>

    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Required Books
        </label>
        <select type="text" multiple class="form-control" placeholder="Required Book" v-model="model.required_book_ids">
          <option :value="book_type._id" v-for="book_type in required_books">{{ book_type.title }}</option>
        </select>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Recommended Books
        </label>
        <select type="text" multiple class="form-control" placeholder="Recommended Book" v-model="model.recommended_book_ids">
          <option :value="book_type._id" v-for="book_type in recommended_books">{{ book_type.title }}</option>
        </select>
      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import InputTag from 'vue-input-tag'

export default {
  name: 'course_form',
  props: ['model'],
  components: {
    InputTag
  },
  created () {
    this.$store.dispatch('book_type/fetchCollection')
    this.$store.dispatch('book_type/fetchCollection')
  },
  computed: {
    required_books () {
      return this.$store.getters['book_type/collection']
    },
    recommended_books () {
      return this.$store.getters['book_type/collection']
    },
  }
}
</script>
