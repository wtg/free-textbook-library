// Book Containers
import BookList from './pages/list'
import BookNew from './pages/new'
import BookShow from './pages/show'
import BookEdit from './pages/edit'
import Middleware from '@/routers/middleware'

const BookListRoute = {
  path: '/books',
  component: BookList,
  beforeEnter: Middleware.requireAdmin
}

const BookNewRoute = {
  path: '/books/new',
  component: BookNew,
  beforeEnter: Middleware.requireAdmin
}

const BookShowRoute = {
  path: '/books/:id',
  component: BookShow,
  props: true,
  beforeEnter: Middleware.requireAdmin
}

const BookEditRoute = {
  path: '/books/:id/edit',
  component: BookEdit,
  props: true,
  beforeEnter: Middleware.requireAdmin
}

export default [
  BookListRoute,
  BookNewRoute,
  BookShowRoute,
  BookEditRoute
]
