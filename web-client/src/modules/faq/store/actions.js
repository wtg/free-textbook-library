// TODO - replace router here - instead,
// emit an event and have it handled by another Vuex module
import router from '@/routers'
import axios from 'axios'
import { API_ROOT } from './constants'
import { $POST, $PUT, $DEL } from '@/store/lib/helpers'
import { PAGINATION_ACTIONS, FILTER_ACTIONS } from '@/store/lib/mixins'


// // // //

export default {
  ...PAGINATION_ACTIONS,
  ...FILTER_ACTIONS('faq'),
  // GET /api/faqs
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
  // GET /api/faqs/:id
  fetchModel ({ state, commit, dispatch }, faqId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${faqId}`, {
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
  // GET /api/faqs/:id
  fetchEditModel ({ state, commit, dispatch }, faqId) {
    commit('fetching', true)
    axios.get(`${API_ROOT}/${faqId}`, {
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
  // POST /api/faqs
  createModel ({ state, commit, dispatch }, faqModel) {
    commit('fetching', true)
    $POST(`${API_ROOT}`, {
      body: faqModel
    })
    .then((faq) => {
      commit('fetching', false)
      router.push(`/faqs`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Create error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // PUT /api/faqs/:id
  updateModel ({ state, commit }, faqModel) {
    commit('fetching', true)
    $PUT(`${API_ROOT}/${faqModel._id}`, {
      body: faqModel
    })
    .then((faq) => {
      commit('fetching', false)
      router.push(`/faqs/${faq._id}`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Update error', context: 'danger', dismissible: true }, { root: true })
      throw err
    })
  },
  // DELETE /api/faqs/:id
  deleteModel ({ state, commit }, faqModel) {
    commit('fetching', true)
    $DEL(`${API_ROOT}/${faqModel._id}`)
    .then((faq) => {
      commit('fetching', false)
      let collection = _.filter(state.collection, (m) => { return m._id !== faqModel._id })
      commit('collection', collection)
      router.push(`/faqs`)
    })
    .catch((err) => {
      commit('fetching', false)
      commit('notification/add', { message: 'Destroy error', context: 'danger', dismissible: true }, { root: true })
      throw err // TODO - better error handling
    })
  }
}
