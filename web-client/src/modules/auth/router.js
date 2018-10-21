// Auth Containers
import Login from './pages/login'
import Register from './pages/register'
import Middleware from '@/routers/middleware'

const LoginRoute = {
  path: '/auth/login',
  component: Login,
  beforeEnter: Middleware.onlyGuest
}

const RegisterRoute = {
  path: '/auth/register',
  component: Register,
  beforeEnter: Middleware.onlyGuest
}

export default [
  LoginRoute,
  RegisterRoute
]
