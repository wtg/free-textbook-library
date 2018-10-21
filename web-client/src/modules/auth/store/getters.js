
// Auth Module Getters
export default {
  login_user: state => {
    return state.login_user
  },
  register_user: state => {
    return state.register_user
  },
  is_authenticated: state => {
    if (state.current_user._id) {
      return true
    } else {
      return false
    }
  },
  isMentor: state => {
    return state.current_user.role === 'mentor'
  },
  isAdmin: state => {
    return state.current_user.role === 'admin'
  },
  current_user: state => {
    return state.current_user
  },
  logging_in: state => {
    return state.logging_in
  },
  token: state => {
    return state.token
  },
  fetching: state => {
    return state.fetching
  }
}
