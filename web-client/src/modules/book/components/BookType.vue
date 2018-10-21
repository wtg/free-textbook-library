<template>
  <!-- { schema, related_schema, rel } -->
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead">Book Type</p>
      <table class="table">
        <thead>
          <th>Title</th>
          <th>Edition</th>
          <th>ISBN 13</th>
          <th>ISBN 10</th>
          <th>Authors</th>
          <th>List Price</th>
          <th>Image URL</th>

        </thead>
        <tbody>
          <tr>
            <td>{{model.title}}</td>
            <td>{{model.edition}}</td>
            <td>{{model.isbn_13}}</td>
            <td>{{model.isbn_10}}</td>
            <td>{{model.authors.join(', ')}}</td>
            <td>{{model.list_price}}</td>
            <td>{{model.image_url}}</td>
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
