import Router from '@/routers'
import { $GET, $POST } from '@/store/lib/helpers'
import {
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  PROFILE_ROUTE,
  LOGIN_SUCCESS_NOTIFICATION,
  LOGIN_ERROR_NOTIFICATION,
  REGISTER_SUCCESS_NOTIFICATION,
  REGISTER_ERROR_NOTIFICATION
} from './constants'

// Auth module actions
const actions = {
  // fetchUserProfile
  // Fetches a user's profiles form the server
  fetchUserProfile ({ state, commit }) {
    commit('logging_in', true)
    return new Promise((resolve, reject) => {
      $GET(PROFILE_ROUTE, { token: state.token })
      .then((json) => {
        commit('current_user', json)
        commit('logging_in', false)
        return resolve(json)
      })
      .catch((err) => {
        commit('clear_token')
        commit('clear_current_user')
        commit('logging_in', false)
        // throw err
        return reject(err)
      })
    })
  },

  // register
  // Handles user registration state management
  register ({ state, dispatch, commit }) {
    // state.loggin_in = true
    commit('logging_in', true)

    // Assembles request payload
    let { email, password, name, username } = state.register_user

    // Sends registration data to server
    $POST(REGISTER_ROUTE, { body: { email, password, name, username } })
    .then((json) => {
      commit('clear_register_user')
      commit('logging_in', false)

      // Shows REGISTER_SUCCESS_NOTIFICATION message
      commit('notification/add', REGISTER_SUCCESS_NOTIFICATION, { root: true })

      // Redirects to login route
      Router.push('/auth/login')
    })
    .catch((err) => {
      // Shows REGISTER_ERROR_NOTIFICATION message
      commit('logging_in', false)
      commit('notification/add', REGISTER_ERROR_NOTIFICATION, { root: true })
      throw err
    })
  },

  // login
  // Handles user login state management
  login ({ commit, dispatch, state }) {
    // state.loggin_in = true
    commit('logging_in', true)

    // Assembles request payload
    let { username, password } = state.login_user

    // Sends login data to server
    $POST(LOGIN_ROUTE, { body: { username, password } })
    .then((json) => {
      // Changes loading state
      commit('logging_in', false)

      // Clears state.login_user
      commit('clear_login_user')

      // Updates store.token
      commit('token', json.token)

      // Shows LOGIN_SUCCESS_NOTIFICATION message
      commit('notification/add', LOGIN_SUCCESS_NOTIFICATION, { root: true })

      // Fetches user profile
      dispatch('fetchUserProfile')

      // Redirects to home route
      Router.push('/')
    })
    .catch((err) => {
      // Shows LOGIN_ERROR_NOTIFICATION message
      commit('logging_in', false)
      commit('notification/add', LOGIN_ERROR_NOTIFICATION, { root: true })
      throw err
    })
  },

  // logout
  // Handles user logout
  logout ({ commit }) {
    commit('clear_token')
    commit('clear_current_user')
    Router.push('/auth/login')
  }
}

// // // //

export default actions
