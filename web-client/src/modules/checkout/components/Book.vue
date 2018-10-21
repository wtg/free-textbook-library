<template>
  <!-- { schema, related_schema, rel } -->
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead">Book</p>
      <table class="table">
        <thead>
          <th>Slug</th>
          <th>Status</th>
          <th>Book Type</th>

        </thead>
        <tbody>
          <tr>
            <td>{{model.slug}}</td>
            <td>{{model.status}}</td>
            <td>{{model.book_type.title}}</td>
          </tr>
        </tbody>
      </table>
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
