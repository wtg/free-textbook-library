// TODO - retire services/auth - should just use Vuex state/getters instead
import Auth from '../services/auth.js'

const requireAuth = (route, redirect, next) => {
  if (!Auth.check()) {
    redirect({
      path: '/login',
      query: { redirect: route.fullPath }
    })
  } else {
    next()
  }
}

const onlyGuest = (route, redirect, next) => {
  if (Auth.check()) {
    redirect({ path: '/' })
  } else {
    next()
  }
}

export default { onlyGuest, requireAuth }
