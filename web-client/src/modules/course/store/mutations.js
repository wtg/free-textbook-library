import _ from 'lodash'
import { NEW_COURSE } from './constants'
import {
  COLLECTION_MUTATIONS,
  PAGINATION_MUTATIONS,
  MODEL_MUTATIONS,
  FILTER_MUTATIONS
} from '@/store/lib/mixins'

// Course Module Mutations
export default {
  required_books (state, required_books) {
    state.required_books = required_books
  },
  recommended_books (state, recommended_books) {
    state.recommended_books = recommended_books
  },
  ...COLLECTION_MUTATIONS,
  ...PAGINATION_MUTATIONS,
  ...MODEL_MUTATIONS,
  ...FILTER_MUTATIONS,
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_COURSE)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
