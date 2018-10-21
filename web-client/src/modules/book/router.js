// Book Containers
import BookList from './pages/list'
import BookNew from './pages/new'
import BookShow from './pages/show'
import BookEdit from './pages/edit'

const BookListRoute = {
  path: '/books',
  component: BookList
}

const BookNewRoute = {
  path: '/books/new',
  component: BookNew
}

const BookShowRoute = {
  path: '/books/:id',
  component: BookShow,
  props: true
}

const BookEditRoute = {
  path: '/books/:id/edit',
  component: BookEdit,
  props: true
}

export default [
  BookListRoute,
  BookNewRoute,
  BookShowRoute,
  BookEditRoute
]
