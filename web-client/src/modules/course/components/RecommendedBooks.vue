
<template>
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead">{{ type }} Books</p>
      <table class="table table-hover">

        <!-- Table Header -->
        <thead>
          <th>Title</th>
          <th>Edition</th>
          <th>ISBN 13</th>
          <th>ISBN 10</th>
          <th>List Price</th>
        </thead>

        <!-- Table Body -->
        <tbody>

          <!-- Empty Table Row -->
          <tr class='table-warning' v-if="!collection[0]">
            <td>Empty</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>

          <tr v-for="m in collection" :key="m._id">
            <td>
              <router-link :to=" '/book_types/' + m._id">
                {{m.title}}
              </router-link>
            </td>
            <td>{{m.edition}}</td>
            <td>
              <b-button
                variant="link"
                v-clipboard:copy="m.isbn_13"
                v-b-tooltip.hover.right
                title="Copy ISBN-13 to clipboard"
              >
                {{ m.isbn_13 }}
                <i class="fa fa-copy"></i>
              </b-button>
            </td>
            <td>
              <b-button
                variant="link"
                v-clipboard:copy="m.isbn_10"
                v-b-tooltip.hover.right
                title="Copy ISBN-10 to clipboard"
              >
                {{ m.isbn_10 }}
                <i class="fa fa-copy"></i>
              </b-button>
            </td>
            <td>${{m.list_price}}</td>
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>

export default {
  props: ['collection', 'type']
}
</script>
