import Vue from 'vue'
import Router from 'vue-router'

// Module routes
import HomeRoutes from '@/modules/home/router'
import AuthRoutes from '@/modules/auth/router'
import UserRoutes from '@/modules/user/router'
import BookTypeRoutes from '@/modules/book_type/router'
import BookRoutes from '@/modules/book/router'
import CheckoutRoutes from '@/modules/checkout/router'
import CourseRoutes from '@/modules/course/router'

// Vue Router setup
Vue.use(Router)

// Exports new Router instance
export default new Router({
  routes: [
    ...HomeRoutes,
    ...AuthRoutes,
    ...UserRoutes,
    ...BookTypeRoutes,
    ...BookRoutes,
    ...CheckoutRoutes,
    ...CourseRoutes
  ]
})
