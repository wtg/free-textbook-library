import {
  COLLECTION_STATE,
  PAGINATION_STATE,
  MODEL_STATE,
  FILTER_STATE
} from '@/store/lib/mixins'

// Course Module State
export default {
  required_books: [],
  recommended_books: [],
  ...COLLECTION_STATE,
  ...PAGINATION_STATE,
  ...MODEL_STATE,
  ...FILTER_STATE,
  newModel: {},
  editModel: {}
}
