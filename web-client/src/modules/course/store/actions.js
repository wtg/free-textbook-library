// TODO - replace router here - instead,
// emit an event and have it handled by another Vuex module
import router from '@/routers'
import axios from 'axios'
import { API_ROOT } from './constants'
import { $POST, $PUT, $DEL } from '@/store/lib/helpers'
import { PAGINATION_ACTIONS, FILTER_ACTIONS } from '@/store/lib/mixins'


// // // //

export default {
  fetchRequiredBooks ({ state, commit, dispatch }, courseId) {
    commit('fetching', true)

    axios.get(API_ROOT + '/' + courseId + '/required_books', {
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
      commit('required_books', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  fetchRecommendedBooks ({ state, commit, dispatch }, courseId) {
    commit('fetching', true)

    axios.get(API_ROOT + '/' + courseId + '/recommended_books', {
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
      commit('recommended_books', data)
      commit('fetching', false)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Fetch error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  },
  ...PAGINATION_ACTIONS,
  ...FILTER_ACTIONS('course'),
  // GET /api/courses
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
  // GET /api/courses/:id
  fetchModel ({ state, commit, dispatch }, courseId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${courseId}`, {
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
  // GET /api/courses/:id
  fetchEditModel ({ state, commit, dispatch }, courseId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${courseId}`, {
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
  // POST /api/courses
  createModel ({ state, commit, dispatch }, courseModel) {
    commit('fetching', true)
    $POST(`${API_ROOT}`, {
      body: courseModel
    })
    .then((course) => {
      commit('fetching', false)
      router.push(`/courses`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // PUT /api/courses/:id
  updateModel ({ state, commit }, courseModel) {
    commit('fetching', true)
    $PUT(`${API_ROOT}/${courseModel._id}`, {
      body: courseModel
    })
    .then((course) => {
      commit('fetching', false)
      router.push(`/courses/${course._id}`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Update error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // DELETE /api/courses/:id
  deleteModel ({ state, commit }, courseModel) {
    commit('fetching', true)
    $DEL(`${API_ROOT}/${courseModel._id}`)
    .then((course) => {
      commit('fetching', false)
      let collection = _.filter(state.collection, (m) => { return m._id !== courseModel._id })
      commit('collection', collection)
      router.push(`/courses`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Destroy error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  }
}
