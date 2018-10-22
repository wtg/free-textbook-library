<template>
  <b-navbar toggleable="md" fixed="top" type="light" class="bg-body">
    <b-navbar-brand to="/">
      <!-- Free Textbook Library -->
      ftl<i style='font-size:95%;' class="fa fa-heart text-danger"></i>
    </b-navbar-brand>

    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">

      <!-- Navbar Links -->
      <b-navbar-nav class="mr-auto">
        <b-nav-item to="/book_types">Books</b-nav-item>
        <b-nav-item to="/courses">Courses</b-nav-item>
        <b-nav-item to="/checkouts" v-if="isAuthenticated">Checkouts</b-nav-item>
      </b-navbar-nav>

      <!-- User Dropdown -->
      <b-navbar-nav class="ml-auto" v-if="isAuthenticated">

        <b-nav-item-dropdown text="Admin" v-if="isAdmin" right>
          <b-dropdown-item to="/checkouts/new">
            <i class="fa fa-shopping-cart"></i>
            Checkout Book
          </b-dropdown-item>
          <b-dropdown-item to="/checkouts/new">
            <i class="fa fa-reply"></i>
            Check-In Book
          </b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item to="/checkouts">Checkouts</b-dropdown-item>
          <b-dropdown-item to="/books">Inventory</b-dropdown-item>
          <b-dropdown-item to="/courses">Courses</b-dropdown-item>
          <b-dropdown-item to="/users">Users</b-dropdown-item>
          <b-dropdown-item to="/faqs">FAQs</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template slot="button-content">
            {{ currentUser.email }}
          </template>
          <b-dropdown-item to="/profile">Profile</b-dropdown-item>
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
    currentUser: 'auth/current_user',
    isAdmin: 'auth/isAdmin'
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
