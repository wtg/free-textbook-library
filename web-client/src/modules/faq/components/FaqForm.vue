<template>
  <div class='row'>
    <div class="col-lg-9">
      <div class="form-group">
        <label class='mb-0'>
          Question
          <span class='text-danger'>*</span>
        </label>
        <input type="text" class="form-control" placeholder="Question" v-model="model.question">
      </div>
    </div>
    <div class="col-lg-3">
      <div class="form-group">
        <label class='mb-0'>
          Order
          <span class='text-danger'>*</span>
        </label>
        <input type="number" class="form-control" placeholder="Order" v-model="model.order">
      </div>
    </div>
    <div class="col-lg-12">
      <div class="form-group">
        <label class='mb-0'>
          Answer
          <span class='text-danger'>*</span>
        </label>
        <textarea
          type="text"
          class="form-control"
          placeholder="Answer"
          v-model="model.answer"
          rows="4"
        ></textarea>
      </div>
    </div>


  </div>
</template>

<!-- // // // //  -->

<script>
import InputTag from 'vue-input-tag'

export default {
  name: 'faq_form',
  props: ['model'],
  components: {
    InputTag
  }
}
</script>
