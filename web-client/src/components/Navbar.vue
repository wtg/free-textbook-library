<template>
  <b-navbar toggleable="md" fixed="top" type="light" variant="light" class="bg-white">
    <b-navbar-brand to="/">
      Textbook Library
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">

      <!-- Navbar Links -->
      <b-navbar-nav class="mr-auto">
        <b-nav-item to="/users">Users</b-nav-item>
        <b-nav-item to="/book_types">Book Types</b-nav-item>
        <b-nav-item to="/books">Books</b-nav-item>
        <b-nav-item to="/checkouts">Checkouts</b-nav-item>
        <b-nav-item to="/courses">Courses</b-nav-item>
      </b-navbar-nav>

      <!-- User Dropdown -->
      <b-navbar-nav class="ml-auto" v-if="isAuthenticated">
        <b-nav-item-dropdown right>
          <template slot="button-content">
            {{ currentUser.email }}
          </template>
          <b-dropdown-item :to="'/users/' + currentUser._id">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout()">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

      <!-- Register / Login -->
      <b-navbar-nav v-else>
        <b-nav-item to="/auth/register">Register</b-nav-item>
        <b-nav-item to="/auth/login">Login</b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: mapGetters({
    isAuthenticated: 'auth/is_authenticated',
    currentUser: 'auth/current_user'
  }),
  methods: mapActions({
    logout: 'auth/logout'
  })
}
</script>

<!-- // // // //  -->

<style lang="sass">

  .navbar-brand
    letter-spacing: .25rem !important
    font-family: sans-serif
    font-weight: 100
    letter-spacing: 0.1rem

    strong
      font-weight: 400

    img.logo
      float: left
      margin-right: 0.4rem
      height: 2rem
      display: flex

</style>
