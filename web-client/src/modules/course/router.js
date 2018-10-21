// Course Containers
import CourseList from './pages/list'
import CourseNew from './pages/new'
import CourseShow from './pages/show'
import CourseEdit from './pages/edit'

const CourseListRoute = {
  path: '/courses',
  component: CourseList
}

const CourseNewRoute = {
  path: '/courses/new',
  component: CourseNew
}

const CourseShowRoute = {
  path: '/courses/:id',
  component: CourseShow,
  props: true
}

const CourseEditRoute = {
  path: '/courses/:id/edit',
  component: CourseEdit,
  props: true
}

export default [
  CourseListRoute,
  CourseNewRoute,
  CourseShowRoute,
  CourseEditRoute
]
