// Auth Containers
import Login from './pages/login'
import Register from './pages/register'

const LoginRoute = {
  path: '/auth/login',
  component: Login
}

const RegisterRoute = {
  path: '/auth/register',
  component: Register
}

export default [
  LoginRoute,
  RegisterRoute
]
