import _ from 'lodash'
import { NEW_BOOK_TYPE } from './constants'
import {
  COLLECTION_MUTATIONS,
  PAGINATION_MUTATIONS,
  MODEL_MUTATIONS,
  FILTER_MUTATIONS
} from '@/store/lib/mixins'

// Book Type Module Mutations
export default {
  books (state, books) {
    state.books = books
  },
  ...COLLECTION_MUTATIONS,
  ...PAGINATION_MUTATIONS,
  ...MODEL_MUTATIONS,
  ...FILTER_MUTATIONS,
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_BOOK_TYPE)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
