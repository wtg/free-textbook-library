import Vue from 'vue'
import Vuex from 'vuex'

import auth from '@/modules/auth/store'
import notification from '@/modules/notification/store'
import user from '@/modules/user/store'
import book_type from '@/modules/book_type/store'
import book from '@/modules/book/store'
import checkout from '@/modules/checkout/store'
import course from '@/modules/course/store'

// Vuex Initialization
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    notification,
    user,
    book_type,
    book,
    checkout,
    course
  }
})
