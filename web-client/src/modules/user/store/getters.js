import {
  COLLECTION_GETTERS,
  PAGINATION_GETTERS,
  MODEL_GETTERS,
  FILTER_GETTERS
} from '@/store/lib/mixins'


// User Module Getters
const getters = {
  rentals: state => {
    return state.rentals
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
