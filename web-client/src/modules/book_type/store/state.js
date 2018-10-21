import {
  COLLECTION_STATE,
  PAGINATION_STATE,
  MODEL_STATE,
  FILTER_STATE
} from '@/store/lib/mixins'

// Book Type Module State
export default {
  books: [],
  ...COLLECTION_STATE,
  ...PAGINATION_STATE,
  ...MODEL_STATE,
  ...FILTER_STATE,
  newModel: {},
  editModel: {}
}
