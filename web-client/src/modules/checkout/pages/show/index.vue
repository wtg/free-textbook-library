<template>
  <LoadingFull v-if="fetching" />
  <div class="container" v-else>

    <CheckoutShowWidget :model="model" :fetching="fetching" />

    <div class="row">
      <div class="col-lg-12">
        <CheckOutLibrarian :model="check_out_librarian" v-if="check_out_librarian._id" />
      </div>

      <div class="col-lg-12">
        <CheckInLibrarian :model="check_in_librarian" v-if="check_in_librarian._id" />
      </div>

      <div class="col-lg-12">
        <Renter :model="renter" v-if="renter._id" />
      </div>

      <div class="col-lg-12">
        <Book :model="book" v-if="book._id" />
      </div>

    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import { mapGetters, mapActions } from 'vuex'
import LoadingFull from '@/components/LoadingFull'
import CheckoutShowWidget from '@/modules/checkout/components/CheckoutShowWidget'
import CheckOutLibrarian from '@/modules/checkout/components/CheckOutLibrarian'
import CheckInLibrarian from '@/modules/checkout/components/CheckInLibrarian'
import Renter from '@/modules/checkout/components/Renter'
import Book from '@/modules/checkout/components/Book'

export default {
  props: ['id'],
  name: 'checkout_show',
  metaInfo: {
    title: 'Checkouts - Show'
  },
  components: {
    CheckOutLibrarian,
    CheckInLibrarian,
    Renter,
    Book,
    CheckoutShowWidget,
    LoadingFull
  },
  created () {
    this.fetch(this.id)
    this.fetchCheckOutLibrarian(this.id)
    this.fetchCheckInLibrarian(this.id)
    this.fetchRenter(this.id)
    this.fetchBook(this.id)
  },
  methods: mapActions({
    fetchCheckOutLibrarian: 'checkout/fetchCheckOutLibrarian',
    fetchCheckInLibrarian: 'checkout/fetchCheckInLibrarian',
    fetchRenter: 'checkout/fetchRenter',
    fetchBook: 'checkout/fetchBook',
    fetch: 'checkout/fetchModel',
    onConfirmDestroy: 'checkout/deleteModel'
  }),
  computed: mapGetters({
    check_out_librarian: 'checkout/check_out_librarian',
    check_in_librarian: 'checkout/check_in_librarian',
    renter: 'checkout/renter',
    book: 'checkout/book',
    model: 'checkout/model',
    fetching: 'checkout/fetching'
  })
}
</script>
