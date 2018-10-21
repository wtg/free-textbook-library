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
  // GET /api/checkouts/:id/check_out_librarian
  fetchCheckOutLibrarian ({ state, commit, dispatch }, checkoutId) {
    commit('fetching', true)
    axios.get(API_ROOT + '/' + checkoutId + '/check_out_librarian', {
    })
    .then(({ data }) => {
      commit('check_out_librarian', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // BELONGS TO
  // GET /api/checkouts/:id/check_in_librarian
  fetchCheckInLibrarian ({ state, commit, dispatch }, checkoutId) {
    commit('fetching', true)
    axios.get(API_ROOT + '/' + checkoutId + '/check_in_librarian', {
    })
    .then(({ data }) => {
      commit('check_in_librarian', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // BELONGS TO
  // GET /api/checkouts/:id/renter
  fetchRenter ({ state, commit, dispatch }, checkoutId) {
    commit('fetching', true)
    axios.get(API_ROOT + '/' + checkoutId + '/renter', {
    })
    .then(({ data }) => {
      commit('renter', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  // BELONGS TO
  // GET /api/checkouts/:id/book
  fetchBook ({ state, commit, dispatch }, checkoutId) {
    commit('fetching', true)
    axios.get(API_ROOT + '/' + checkoutId + '/book', {
    })
    .then(({ data }) => {
      commit('book', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  ...PAGINATION_ACTIONS,
  ...FILTER_ACTIONS('checkout'),
  // GET /api/checkouts
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
  // GET /api/checkouts/:id
  fetchModel ({ state, commit, dispatch }, checkoutId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${checkoutId}`, {
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
  // GET /api/checkouts/:id
  fetchEditModel ({ state, commit, dispatch }, checkoutId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${checkoutId}`, {
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
  // POST /api/checkouts
  createModel ({ state, commit, dispatch }, checkoutModel) {
    commit('fetching', true)
    $POST(`${API_ROOT}`, {
      body: checkoutModel
    })
    .then((checkout) => {
      commit('fetching', false)
      router.push(`/checkouts`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // PUT /api/checkouts/:id
  updateModel ({ state, commit }, checkoutModel) {
    commit('fetching', true)
    $PUT(`${API_ROOT}/${checkoutModel._id}`, {
      body: checkoutModel
    })
    .then((checkout) => {
      commit('fetching', false)
      router.push(`/checkouts/${checkout._id}`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Update error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // DELETE /api/checkouts/:id
  deleteModel ({ state, commit }, checkoutModel) {
    commit('fetching', true)
    $DEL(`${API_ROOT}/${checkoutModel._id}`)
    .then((checkout) => {
      commit('fetching', false)
      let collection = _.filter(state.collection, (m) => { return m._id !== checkoutModel._id })
      commit('collection', collection)
      router.push(`/checkouts`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Destroy error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  }
}
