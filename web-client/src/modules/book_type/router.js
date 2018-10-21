// BookType Containers
import BookTypeList from './pages/list'
import BookTypeNew from './pages/new'
import BookTypeShow from './pages/show'
import BookTypeEdit from './pages/edit'
import Middleware from '@/routers/middleware'

const BookTypeListRoute = {
  path: '/book_types',
  component: BookTypeList
}

const BookTypeNewRoute = {
  path: '/book_types/new',
  component: BookTypeNew,
  beforeEnter: Middleware.requireAdmin
}

const BookTypeShowRoute = {
  path: '/book_types/:id',
  component: BookTypeShow,
  props: true
}

const BookTypeEditRoute = {
  path: '/book_types/:id/edit',
  component: BookTypeEdit,
  props: true,
  beforeEnter: Middleware.requireAdmin
}

export default [
  BookTypeListRoute,
  BookTypeNewRoute,
  BookTypeShowRoute,
  BookTypeEditRoute
]
