// Faq Containers
import FaqList from './pages/list'
import FaqNew from './pages/new'
import FaqShow from './pages/show'
import FaqEdit from './pages/edit'
import Middleware from '@/routers/middleware'

const FaqListRoute = {
  path: '/faqs',
  component: FaqList,
  beforeEnter: Middleware.requireAdmin
}

const FaqNewRoute = {
  path: '/faqs/new',
  component: FaqNew,
  beforeEnter: Middleware.requireAdmin
}

const FaqShowRoute = {
  path: '/faqs/:id',
  component: FaqShow,
  props: true,
  beforeEnter: Middleware.requireAdmin
}

const FaqEditRoute = {
  path: '/faqs/:id/edit',
  component: FaqEdit,
  props: true,
  beforeEnter: Middleware.requireAdmin
}

export default [
  FaqListRoute,
  FaqNewRoute,
  FaqShowRoute,
  FaqEditRoute
]
