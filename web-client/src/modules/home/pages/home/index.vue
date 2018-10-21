<template>
  <div class="container-fluid">
    <div class="row h-100 align-items-center">
      <div class="col-lg-12">

        <div class="row">
          <div class="col-lg-12 text-center">
            <h1 class='display-1' style="font-family: monospace;">ftl<i style='font-size:75%;' class="fa fa-heart text-danger"></i></h1>
            <p class="welcome-text mb-0">Free Textbook Library</p>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-lg-12 text-center">
            {{ title }}
          </div>
        </div>

        <div class="row my-4">
          <div class="col-lg-12 text-center">
            <b-button size="lg" variant="outline-dark" class="mx-2" to="/book_types">
              <i class="fa fa-book"></i>
              Browse Books
            </b-button>

            <b-button size="lg" variant="outline-dark" class="mx-2" to="/courses">
              <i class="fa fa-university"></i>
              Browse Courses
            </b-button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import sample from 'lodash/sample'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Home'
  },
  data () {
    return {
      titles: [
        'not your daddy\'s bookstore',
        '100% organic',
        'Take a book, leave a book'
      ]
    }
  },
  computed: {
    title () {
      return sample(this.titles)
    }
  }
}
</script>

<style lang="sass">
  img.welcome-logo
    height: 4rem
    width: 4rem

  .welcome-text
    letter-spacing: .6rem
    font-weight: 300
    font-size: 2rem
</style>
