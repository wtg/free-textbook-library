import {
  COLLECTION_GETTERS,
  PAGINATION_GETTERS,
  MODEL_GETTERS,
  FILTER_GETTERS
} from '@/store/lib/mixins'


// Faq Module Getters
const getters = {
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
