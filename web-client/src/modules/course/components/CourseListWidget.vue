<template>
  <table class="table table-hover">

    <!-- Table Header -->
    <thead>
      <th>Label</th>
      <th>Subject Code</th>
      <th>Course Number</th>
      <th>Required Books</th>
      <th>Recommended Books</th>
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
          <router-link :to=" '/courses/' + m._id">
            {{m.label}}
          </router-link>
        </td>
        <td>{{m.subject_code}}</td>
        <td>{{m.course_number}}</td>
        <td v-if="m.required_book_ids">
          {{ m.required_book_ids.length }} Required Books
        </td>
        <td v-else>
          None
        </td>
        <td v-if="m.recommended_book_ids">
          {{ m.recommended_book_ids.length }} Recommended Books
        </td>
        <td v-else>
          None
        </td>
      </tr>
    </tbody>

  </table>
</template>

<!-- // // // //  -->

<script>
export default {
  props: ['collection']
}
</script>

