// Checkout Containers
import CheckoutList from './pages/list'
import CheckoutNew from './pages/new'
import CheckoutShow from './pages/show'
import CheckoutEdit from './pages/edit'
import Middleware from '@/routers/middleware'

const CheckoutListRoute = {
  path: '/checkouts',
  component: CheckoutList,
  beforeEnter: Middleware.requireAuth
}

const CheckoutNewRoute = {
  path: '/checkouts/new',
  component: CheckoutNew,
  beforeEnter: Middleware.requireAdmin
}

const CheckoutShowRoute = {
  path: '/checkouts/:id',
  component: CheckoutShow,
  props: true,
  beforeEnter: Middleware.requireAuth
}

const CheckoutEditRoute = {
  path: '/checkouts/:id/edit',
  component: CheckoutEdit,
  props: true,
  beforeEnter: Middleware.requireAdmin
}

export default [
  CheckoutListRoute,
  CheckoutNewRoute,
  CheckoutShowRoute,
  CheckoutEditRoute
]
