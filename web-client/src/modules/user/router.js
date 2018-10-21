// User Containers
import UserList from './pages/list'
import UserNew from './pages/new'
import UserShow from './pages/show'
import UserEdit from './pages/edit'

const UserListRoute = {
  path: '/users',
  component: UserList
}

const UserNewRoute = {
  path: '/users/new',
  component: UserNew
}

const UserShowRoute = {
  path: '/users/:id',
  component: UserShow,
  props: true
}

const UserEditRoute = {
  path: '/users/:id/edit',
  component: UserEdit,
  props: true
}

export default [
  UserListRoute,
  UserNewRoute,
  UserShowRoute,
  UserEditRoute
]
