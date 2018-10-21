import _ from 'lodash'
import { NEW_USER } from './constants'
import {
  COLLECTION_MUTATIONS,
  PAGINATION_MUTATIONS,
  MODEL_MUTATIONS,
  FILTER_MUTATIONS
} from '@/store/lib/mixins'

// User Module Mutations
export default {
  rentals (state, rentals) {
    state.rentals = rentals
  },
  ...COLLECTION_MUTATIONS,
  ...PAGINATION_MUTATIONS,
  ...MODEL_MUTATIONS,
  ...FILTER_MUTATIONS,
  resetNewModel (state) {
    state.newModel = _.cloneDeep(NEW_USER)
  },
  editModel (state, model) {
    state.editModel = _.cloneDeep(model)
  }
}
