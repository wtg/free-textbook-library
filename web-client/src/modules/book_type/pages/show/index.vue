<!-- <template> -->
  <!-- <LoadingFull v-if="fetching" /> -->
  <!-- <div class="container" v-else> -->

    <!-- <BookTypeShowWidget :model="model" :fetching="fetching" /> -->

    <!-- <div class="row"> -->
      <!-- <div class="col-lg-12"> -->
        <!-- <Books :collection="books" /> -->
      <!-- </div> -->

    <!-- </div> -->

  <!-- </div> -->
<!-- </template> -->

<template>
  <div class="container">

    <!-- <BookTypeShowWidget :model="model" :fetching="fetching" /> -->
    <b-row>
      <b-col lg="3">
        <div class="card">
          <img class="card-img-top" :src="model.image_url" height="100%" alt="Card image cap">
        </div>

        <hr>

        <button class="btn btn-lg btn-block btn-success" v-if="isAuthenticated">
          <i class="fa fa-book"></i>
          Rent this book
        </button>

        <button class="btn btn-lg btn-block btn-outline-primary">
          <i class="fa fa-gift"></i>
          Donate this book
        </button>

        <b-button size="lg" block variant="outline-warning" :to="'/book_types/' + model._id + '/edit'" v-if="isAdmin">
          <i class="fa fa-fw fa-pencil"></i>
          Edit
        </b-button>

      </b-col>

      <b-col lg="9">
        <b-row>
          <b-col lg='12'>
            <p class="lead mb-0">
              {{ model.title }}
              <small class='text-muted'>{{ model.edition }} Edition</small>
            </p>
            <small class='text-muted'>{{ model.authors.join(', ') }}</small>
            <br>
            <small class='text-muted'>
              ISBN-10: {{ model.isbn_10 }}
              <b-button
                size="sm"
                variant="link"
                v-clipboard:copy="model.isbn_10"
                v-b-tooltip.hover.right
                title="Copy ISBN-10 to clipboard"
              >
                <i class="fa fa-copy"></i>
              </b-button>
            </small>
            <br>
            <small class='text-muted'>
              ISBN-13: {{ model.isbn_13 }}
              <b-button
                size="sm"
                variant="link"
                v-clipboard:copy="model.isbn_13"
                v-b-tooltip.hover.right
                title="Copy ISBN-13 to clipboard"
              >
                <i class="fa fa-copy"></i>
              </b-button>
            </small>

            <br>

            <small class='text-muted'> Collegiate Store Price: ${{ model.list_price }}</small>

            <hr>
          </b-col>
          <b-col lg='12'>
            <Books :collection="books" />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import BookTypeShowWidget from '@/modules/book_type/components/BookTypeShowWidget'
import Books from '@/modules/book_type/components/Books'

export default {
  props: ['id'],
  name: 'book_type_show',
  metaInfo: {
    title: 'Book Types - Show'
  },
  components: {
    Books,
    BookTypeShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
    this.fetchBooks(this.id)
  },
  methods: mapActions({
    fetchBooks: 'book_type/fetchBooks',
    fetch: 'book_type/fetchModel',
    onConfirmDestroy: 'book_type/deleteModel'
  }),
  computed: mapGetters({
    books: 'book_type/books',
    model: 'book_type/model',
    fetching: 'book_type/fetching',
    isAuthenticated: 'auth/is_authenticated',
    isAdmin: 'auth/isAdmin',
  })
}
</script>
