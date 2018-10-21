<template>
  <!-- { schema, related_schema, rel } -->
  <div class="card mb-3">
    <div class="card-body">
      <p class="lead">Check Out Librarian</p>
      <table class="table">
        <thead>
          <th>E-Mail</th>
          <th>Username</th>
          <th>Roles</th>
          <th>Verified</th>
          <th>Banned</th>

        </thead>
        <tbody>
          <tr>
            <td>{{model.email}}</td>
            <td>{{model.username}}</td>
            <td>{{model.roles.join(', ')}}</td>
            <td>
              <span>
                <i class="fa fa-fw fa-check-square-o" v-if="model.verified"></i>
                <i class="fa fa-fw fa-square-o" v-if="!model.verified"></i>
              </span>
            </td>
            <td>
              <span>
                <i class="fa fa-fw fa-check-square-o" v-if="model.banned"></i>
                <i class="fa fa-fw fa-square-o" v-if="!model.banned"></i>
              </span>
            </td>
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
