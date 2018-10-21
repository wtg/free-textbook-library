// TODO - replace router here - instead,
// emit an event and have it handled by another Vuex module
import router from '@/routers'
import axios from 'axios'
import { API_ROOT } from './constants'
import { $POST, $PUT, $DEL } from '@/store/lib/helpers'
import { PAGINATION_ACTIONS, FILTER_ACTIONS } from '@/store/lib/mixins'


// // // //

export default {
  // OWNS MANY
  // GET /api/book_types/:id/books
  fetchBooks ({ state, commit, dispatch }, book_typeId) {
    commit('fetching', true)

    axios.get(API_ROOT + '/' + book_typeId + '/books', {
      // headers: {
      //   authorization: rootGetters['auth/token']
      // },
      // params: {
      //   search: state.filter,
      //   page: state.currentPage,
      //   per_page: state.pageSize
      // }
    })
    .then(({ data }) => {
      commit('books', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  ...PAGINATION_ACTIONS,
  ...FILTER_ACTIONS('book_type'),
  // GET /api/book_types
  fetchCollection ({ state, commit, dispatch, rootGetters }) {
    commit('fetching', true)
    let apiRoot
    if (state.filter) {
      apiRoot = API_ROOT + '/search'
    } else {
      apiRoot = API_ROOT
    }
    axios.get(apiRoot, {
      headers: {
        authorization: rootGetters['auth/token']
      },
      params: {
        search: state.filter,
        page: state.currentPage,
        per_page: state.pageSize
      }
    })
    .then(({ data }) => {
      console.log(data)
      commit('collection', data.items)
      commit('pageSize', data.per_page)
      commit('currentPage', data.page)
      commit('count', data.count)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // GET /api/book_types/:id
  fetchModel ({ state, commit, dispatch }, book_typeId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${book_typeId}`, {
      // headers: {
      //   authorization: rootGetters['auth/token']
      // }
    })
    .then(({ data }) => {
      commit('model', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // GET /api/book_types/:id
  fetchEditModel ({ state, commit, dispatch }, book_typeId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${book_typeId}`, {
      // headers: {
      //   authorization: rootGetters['auth/token']
      // }
    })
    .then(({ data }) => {
      commit('editModel', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // POST /api/book_types
  createModel ({ state, commit, dispatch }, book_typeModel) {
    commit('fetching', true)
    $POST(`${API_ROOT}`, {
      body: book_typeModel
    })
    .then((book_type) => {
      commit('fetching', false)
      router.push(`/book_types`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // PUT /api/book_types/:id
  updateModel ({ state, commit }, book_typeModel) {
    commit('fetching', true)
    $PUT(`${API_ROOT}/${book_typeModel._id}`, {
      body: book_typeModel
    })
    .then((book_type) => {
      commit('fetching', false)
      router.push(`/book_types/${book_type._id}`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Update error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // DELETE /api/book_types/:id
  deleteModel ({ state, commit }, book_typeModel) {
    commit('fetching', true)
    $DEL(`${API_ROOT}/${book_typeModel._id}`)
    .then((book_type) => {
      commit('fetching', false)
      let collection = _.filter(state.collection, (m) => { return m._id !== book_typeModel._id })
      commit('collection', collection)
      router.push(`/book_types`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Destroy error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  }
}
