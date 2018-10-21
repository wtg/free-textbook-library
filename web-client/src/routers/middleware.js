import store from '@/store'

const requireAuth = (to, from, next) => {
  const token = store.getters['auth/token']
  const currentUser = store.getters['auth/current_user']

  // Send to Login page if no token exists
  if (!token) {
    next({ path: '/auth/login' })
  // Send to destination if the user has already authenticated
  } else if (currentUser._id) {
    next()
  // User has a token, has not yet authenticated with it
  } else {
    store.dispatch('auth/fetchUserProfile')
    .then(() => { next() })
    .catch(() => {
      next({ path: '/auth/login' })
    })
  }
}

const requireAdmin = (to, from, next) => {
  const currentUser = store.getters['auth/current_user']
  const token = store.getters['auth/token']

  // Send to destination if the user has already authenticated
  if (currentUser._id && currentUser.admin) {
    next()
  // Send to Login page if no token exists
  } else if (!token) {
    next({ path: '/auth/login' })
  } else {
    store.dispatch('auth/fetchUserProfile')
    .then(() => {
      const user = store.getters['auth/current_user']
      if (user.admin) return next()
      return next({ path: from.path })
    })
    .catch(() => {
      next({ path: '/auth/login' })
    })
  }
}

const onlyGuest = (to, from, next) => {
  if (store.getters['auth/token']) {
    next({ path: from.path })
  } else {
    next()
  }
}

export default {
  onlyGuest,
  requireAuth,
  requireAdmin
}
