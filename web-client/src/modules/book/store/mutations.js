import _ from 'lodash'
import { NEW_BOOK } from './constants'
import {
  COLLECTION_MUTATIONS,
  PAGINATION_MUTATIONS,
  MODEL_MUTATIONS,
  FILTER_MUTATIONS
} from '@/store/lib/mixins'

// Book Module Mutations
export default {
  book_type (state, book_type) {
    state.book_type = book_type
  },
  checkouts (state, checkouts) {
    state.checkouts = checkouts
  },
  ...COLLECTION_MUTATIONS,
  ...PAGINATION_MUTATIONS,
  ...MODEL_MUTATIONS,
  ...FILTER_MUTATIONS,
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_BOOK)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
