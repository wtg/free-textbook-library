import {
  COLLECTION_GETTERS,
  PAGINATION_GETTERS,
  MODEL_GETTERS,
  FILTER_GETTERS
} from '@/store/lib/mixins'


// Checkout Module Getters
const getters = {
  check_out_librarian: state => {
    return state.check_out_librarian
  },
  check_in_librarian: state => {
    return state.check_in_librarian
  },
  renter: state => {
    return state.renter
  },
  book: state => {
    return state.book
  },
  ...COLLECTION_GETTERS,
  ...PAGINATION_GETTERS,
  ...MODEL_GETTERS,
  ...FILTER_GETTERS,
  newModel: state => {
    return state.newModel
  },
  editModel: state => {
    return state.editModel
  }
}

export default getters
