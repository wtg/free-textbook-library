import Router from '@/routers'
import axios from 'axios'
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
  fetchUserProfile ({ getters, commit }) {
    return new Promise((resolve, reject) => {

      // Prevents unnecssary fetch on client start
      if (!getters['token']) {
        commit('clear_token')
        commit('clear_current_user')
        commit('logging_in', false)
        return resolve()
      }

      commit('logging_in', true)

      axios.get(PROFILE_ROUTE, {
        headers: {
          authorization: getters['authorizationHeader']
        }
      })
      .then(({ data }) => {
        commit('current_user', data)
        commit('logging_in', false)
        return resolve(data)
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
    let { email, username, password } = state.register_user

    // Sends login data to server
    axios({
      method: 'post',
      url: REGISTER_ROUTE,
      data: {
        email: state.register_user.email,
        username: state.register_user.username,
        password: state.register_user.password
      }
    })
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
    axios({
      method: 'post',
      url: LOGIN_ROUTE,
      data: {
        username: state.login_user.username,
        password: state.login_user.password
      }
    })
    .then(({ data }) => {
      // Changes loading state
      commit('logging_in', false)

      // Clears state.login_user
      commit('clear_login_user')

      // Updates store.token
      commit('token', data.token)

      // Pulls current user data from server response
      const { username, email, admin, _id, roles } = data
      commit('current_user', { username, email, admin, _id, roles })

      // Shows LOGIN_SUCCESS_NOTIFICATION message
      commit('notification/add', LOGIN_SUCCESS_NOTIFICATION, { root: true })

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
