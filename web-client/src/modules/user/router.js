// User Containers
import UserList from './pages/list'
import UserNew from './pages/new'
import UserShow from './pages/show'
import UserEdit from './pages/edit'
import Middleware from '@/routers/middleware'

const UserListRoute = {
  path: '/users',
  component: UserList,
  beforeEnter: Middleware.requireAdmin
}

const UserNewRoute = {
  path: '/users/new',
  component: UserNew,
  beforeEnter: Middleware.requireAdmin
}

const UserShowRoute = {
  path: '/users/:id',
  component: UserShow,
  props: true,
  beforeEnter: Middleware.requireAdmin
}

const ProfileRoute = {
  path: '/profile',
  component: UserShow,
  props: true,
  beforeEnter: Middleware.requireAuth
}

const UserEditRoute = {
  path: '/users/:id/edit',
  component: UserEdit,
  props: true,
  beforeEnter: Middleware.requireAdmin
}

export default [
  UserListRoute,
  UserNewRoute,
  UserShowRoute,
  ProfileRoute,
  UserEditRoute
]
