import _ from 'lodash'
import { NEW_FAQ } from './constants'
import {
  COLLECTION_MUTATIONS,
  PAGINATION_MUTATIONS,
  MODEL_MUTATIONS,
  FILTER_MUTATIONS
} from '@/store/lib/mixins'

// Faq Module Mutations
export default {
  ...COLLECTION_MUTATIONS,
  ...PAGINATION_MUTATIONS,
  ...MODEL_MUTATIONS,
  ...FILTER_MUTATIONS,
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_FAQ)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
