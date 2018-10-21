import store from '@/store'
import debounce from 'lodash/debounce'

// // // //
// Adds a Collection to a Vuex module

export const COLLECTION_GETTERS = {
  collection: state => {
    return state.collection
  },
  fetching: state => {
    return state.fetching
  }
}

export const COLLECTION_MUTATIONS = {
  collection (state, collection) {
    state.collection = collection
  },
  fetching (state, isFetching) {
    state.fetching = isFetching
  }
}

export const COLLECTION_STATE = {
  collection: [],
  fetching: false
}

// // // //
// Adds a Model definition to a Vuex module
export const MODEL_GETTERS = {
  model: state => {
    return state.model
  }
}

export const MODEL_MUTATIONS = {
  model (state, model) {
    state.model = model
  }
}

export const MODEL_STATE = {
  model: {}
}

// // // //
// Adds Collection filtering to a Vuex module

export const FILTER_GETTERS = {
  filter: state => {
    return state.filter
  }
}

export const FILTER_MUTATIONS = {
  filter: (state, filter) => {
    state.filter = filter
  }
}

export const FILTER_STATE = {
  filter: ''
}

export const FILTER_ACTIONS = (module) => {

  function fetchCollection () {
    store.commit(`${module}/currentPage`, 0) // Sets query to search from page 0
    store.dispatch(`${module}/fetchCollection`) // Fetches collection
  }

  // Defines a function that sets the pagination's page to 0
  // And dispatches an api call to GET /api/module/search
  // after a 1000 delay from the last time the function was called
  // TLDR this throttles expensive search API calls
  const debouncedFetch = debounce(fetchCollection, 1000)

  return {
    setFilter ({ commit }, filter) {
      commit('filter', filter)
      debouncedFetch()
    },
    clearFilter ({ state, commit }) {
      commit('filter', '')
      debouncedFetch()
    }
  }
}

// // // //
// Pagination Mixins

export const PAGINATION_STATE = {
  count: 0,
  pageSize: 5,
  currentPage: 0
}

export const PAGINATION_ACTIONS = {
  goToPage ({ dispatch, commit }, page) {
    commit('currentPage', page)
    dispatch('fetchCollection')
  }
}

export const PAGINATION_MUTATIONS = {
  currentPage (state, page) {
    state.currentPage = page
  },
  pageSize (state, newSize) {
    state.pageSize = newSize
  },
  count (state, count) {
    state.count = count
  }
}

export const PAGINATION_GETTERS = {
  currentPage: state => {
    return state.currentPage
  },
  pageSize: state => {
    return state.pageSize
  },
  count: state => {
    return state.count - state.pageSize
  }
}