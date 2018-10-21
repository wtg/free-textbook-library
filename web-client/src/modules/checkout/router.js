// Checkout Containers
import CheckoutList from './pages/list'
import CheckoutNew from './pages/new'
import CheckoutShow from './pages/show'
import CheckoutEdit from './pages/edit'

const CheckoutListRoute = {
  path: '/checkouts',
  component: CheckoutList
}

const CheckoutNewRoute = {
  path: '/checkouts/new',
  component: CheckoutNew
}

const CheckoutShowRoute = {
  path: '/checkouts/:id',
  component: CheckoutShow,
  props: true
}

const CheckoutEditRoute = {
  path: '/checkouts/:id/edit',
  component: CheckoutEdit,
  props: true
}

export default [
  CheckoutListRoute,
  CheckoutNewRoute,
  CheckoutShowRoute,
  CheckoutEditRoute
]
