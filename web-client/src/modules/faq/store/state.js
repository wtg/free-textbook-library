import {
  COLLECTION_STATE,
  PAGINATION_STATE,
  MODEL_STATE,
  FILTER_STATE
} from '@/store/lib/mixins'

// Faq Module State
export default {
  ...COLLECTION_STATE,
  ...PAGINATION_STATE,
  ...MODEL_STATE,
  ...FILTER_STATE,
  newModel: {},
  editModel: {}
}
