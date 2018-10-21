import {
  COLLECTION_STATE,
  PAGINATION_STATE,
  MODEL_STATE,
  FILTER_STATE
} from '@/store/lib/mixins'

// Book Module State
export default {
  book_type: {},
  checkouts: [],
  ...COLLECTION_STATE,
  ...PAGINATION_STATE,
  ...MODEL_STATE,
  ...FILTER_STATE,
  newModel: {},
  editModel: {}
}
