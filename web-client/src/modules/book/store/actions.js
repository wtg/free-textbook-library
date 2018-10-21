// TODO - replace router here - instead,
// emit an event and have it handled by another Vuex module
import router from '@/routers'
import axios from 'axios'
import { API_ROOT } from './constants'
import { $POST, $PUT, $DEL } from '@/store/lib/helpers'
import { PAGINATION_ACTIONS, FILTER_ACTIONS } from '@/store/lib/mixins'


// // // //

export default {
  // BELONGS TO
  // GET /api/books/:id/book_type
  fetchBookType ({ state, commit, dispatch }, bookId) {
    commit('fetching', true)
    axios.get(API_ROOT + '/' + bookId + '/book_type', {
    })
    .then(({ data }) => {
      commit('book_type', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // OWNS MANY
  // GET /api/books/:id/checkouts
  fetchCheckouts ({ state, commit, dispatch }, bookId) {
    commit('fetching', true)

    axios.get(API_ROOT + '/' + bookId + '/checkouts', {
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
      commit('checkouts', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  ...PAGINATION_ACTIONS,
  ...FILTER_ACTIONS('book'),
  // GET /api/books
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
  // GET /api/books/:id
  fetchModel ({ state, commit, dispatch }, bookId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${bookId}`, {
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
  // GET /api/books/:id
  fetchEditModel ({ state, commit, dispatch }, bookId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${bookId}`, {
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
  // POST /api/books
  createModel ({ state, commit, dispatch }, bookModel) {
    commit('fetching', true)
    $POST(`${API_ROOT}`, {
      body: bookModel
    })
    .then((book) => {
      commit('fetching', false)
      router.push(`/books`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // PUT /api/books/:id
  updateModel ({ state, commit }, bookModel) {
    commit('fetching', true)
    $PUT(`${API_ROOT}/${bookModel._id}`, {
      body: bookModel
    })
    .then((book) => {
      commit('fetching', false)
      router.push(`/books/${book._id}`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Update error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // DELETE /api/books/:id
  deleteModel ({ state, commit }, bookModel) {
    commit('fetching', true)
    $DEL(`${API_ROOT}/${bookModel._id}`)
    .then((book) => {
      commit('fetching', false)
      let collection = _.filter(state.collection, (m) => { return m._id !== bookModel._id })
      commit('collection', collection)
      router.push(`/books`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Destroy error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  }
}
