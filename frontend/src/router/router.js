import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import EventListView from '@/views/EventListView.vue'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegistrationView.vue'
import UserinfoView from '@/views/UserinfoView.vue'
import SearchView from '@/views/SearchView.vue'
// import NProgress from 'nprogress'
const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventListView,
    props: (route) => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
  },
  {
    path: '/userinfo',
    name: 'Userinfo',
    component: UserinfoView,
  },
  {
    path: '/search',
    name: 'Searchview',
    component: SearchView,
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFoundView,
    props: true
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFoundView
  },
  {
    path: '/network-error',
    name: 'NetworkError',
    component: NetWorkErrorView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
// router.beforeEach(() => {
//   NProgress.start()
// })

// router.afterEach(() => {
//   NProgress.done()
// })

export default router
