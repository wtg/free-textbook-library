import {
  COLLECTION_STATE,
  PAGINATION_STATE,
  MODEL_STATE,
  FILTER_STATE
} from '@/store/lib/mixins'

// Checkout Module State
export default {
  check_out_librarian: {},
  check_in_librarian: {},
  renter: {},
  book: {},
  ...COLLECTION_STATE,
  ...PAGINATION_STATE,
  ...MODEL_STATE,
  ...FILTER_STATE,
  newModel: {},
  editModel: {}
}
