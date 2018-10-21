// Course Containers
import CourseList from './pages/list'
import CourseNew from './pages/new'
import CourseShow from './pages/show'
import CourseEdit from './pages/edit'
import Middleware from '@/routers/middleware'

const CourseListRoute = {
  path: '/courses',
  component: CourseList
}

const CourseNewRoute = {
  path: '/courses/new',
  component: CourseNew,
  beforeEnter: Middleware.requireAdmin
}

const CourseShowRoute = {
  path: '/courses/:id',
  component: CourseShow,
  props: true
}

const CourseEditRoute = {
  path: '/courses/:id/edit',
  component: CourseEdit,
  props: true,
  beforeEnter: Middleware.requireAdmin
}

export default [
  CourseListRoute,
  CourseNewRoute,
  CourseShowRoute,
  CourseEditRoute
]
