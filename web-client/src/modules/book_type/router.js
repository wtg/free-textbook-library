// BookType Containers
import BookTypeList from './pages/list'
import BookTypeNew from './pages/new'
import BookTypeShow from './pages/show'
import BookTypeEdit from './pages/edit'

const BookTypeListRoute = {
  path: '/book_types',
  component: BookTypeList
}

const BookTypeNewRoute = {
  path: '/book_types/new',
  component: BookTypeNew
}

const BookTypeShowRoute = {
  path: '/book_types/:id',
  component: BookTypeShow,
  props: true
}

const BookTypeEditRoute = {
  path: '/book_types/:id/edit',
  component: BookTypeEdit,
  props: true
}

export default [
  BookTypeListRoute,
  BookTypeNewRoute,
  BookTypeShowRoute,
  BookTypeEditRoute
]
