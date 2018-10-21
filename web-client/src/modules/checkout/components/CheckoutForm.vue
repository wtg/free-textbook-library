<template>
  <div class='row'>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Start Date
<span class='text-danger'>*</span>        </label>
        <input type="date" class="form-control" placeholder="Start Date" v-model="model.start_date">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          End Date
<span class='text-danger'>*</span>        </label>
        <input type="date" class="form-control" placeholder="End Date" v-model="model.end_date">
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Status
<span class='text-danger'>*</span>        </label>
        <input type="text" class="form-control" placeholder="Status" v-model="model.status">
      </div>
    </div>

    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Check Out Librarian
        </label>
        <select type="text" class="form-control" placeholder="Check Out Librarian" v-model="model.check_out_librarian_id">
          <option :value="user._id" v-for="user in check_out_librarians">{{ user.email }}</option>
        </select>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Check In Librarian
        </label>
        <select type="text" class="form-control" placeholder="Check In Librarian" v-model="model.check_in_librarian_id">
          <option :value="user._id" v-for="user in check_in_librarians">{{ user.email }}</option>
        </select>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Renter
        </label>
        <select type="text" class="form-control" placeholder="Renter" v-model="model.renter_id">
          <option :value="user._id" v-for="user in renters">
            {{ user.email }}
          </option>
        </select>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="form-group">
        <label class='mb-0'>
          Book
        </label>
        <select type="text" class="form-control" placeholder="Book" v-model="model.book_id">
          <option :value="book._id" v-for="book in books">
            {{ book.slug }}
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
  name: 'checkout_form',
  props: ['model'],
  components: {
    InputTag
  },
  created () {
    this.$store.dispatch('user/fetchCollection')
    this.$store.dispatch('user/fetchCollection')
    this.$store.dispatch('user/fetchCollection')
    this.$store.dispatch('book/fetchCollection')
  },
  computed: {
    check_out_librarians () {
      return this.$store.getters['user/collection']
    },
    check_in_librarians () {
      return this.$store.getters['user/collection']
    },
    renters () {
      return this.$store.getters['user/collection']
    },
    books () {
      return this.$store.getters['book/collection']
    },
  }
}
</script>
