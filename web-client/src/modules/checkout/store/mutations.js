import _ from 'lodash'
import { NEW_CHECKOUT } from './constants'
import {
  COLLECTION_MUTATIONS,
  PAGINATION_MUTATIONS,
  MODEL_MUTATIONS,
  FILTER_MUTATIONS
} from '@/store/lib/mixins'

// Checkout Module Mutations
export default {
  check_out_librarian (state, check_out_librarian) {
    state.check_out_librarian = check_out_librarian
  },
  check_in_librarian (state, check_in_librarian) {
    state.check_in_librarian = check_in_librarian
  },
  renter (state, renter) {
    state.renter = renter
  },
  book (state, book) {
    state.book = book
  },
  ...COLLECTION_MUTATIONS,
  ...PAGINATION_MUTATIONS,
  ...MODEL_MUTATIONS,
  ...FILTER_MUTATIONS,
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_CHECKOUT)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
