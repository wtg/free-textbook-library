import {
  COLLECTION_GETTERS,
  PAGINATION_GETTERS,
  MODEL_GETTERS,
  FILTER_GETTERS
} from '@/store/lib/mixins'


// Book Module Getters
const getters = {
  book_type: state => {
    return state.book_type
  },
  checkouts: state => {
    return state.checkouts
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
