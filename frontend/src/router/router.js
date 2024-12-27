import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import MainpageView from '@/views/MainpageView.vue'
import NetWorkErrorView from '@/views/NetworkErrorView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegistrationView.vue'
import UserinfoView from '@/views/UserinfoView.vue'
import SearchView from '@/views/SearchView.vue'
import ProductDetailView from '@/views/content/ProductDetailView.vue'
import ResetpasswordView from '@/views/ForgetpasswordView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import GStore from '@/store'

const routes = [
  {
    path: '/',
    name: 'Mainpage',
    component: MainpageView,
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
    path: '/resetpassword',
    name: 'Resetpassword',
    component: ResetpasswordView,
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
    path: "/productdetail/:id",
    name: "ProductDetailView",
    props: true,
    component: ProductDetailView,
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response) => {
          GStore.event = response.data
        })
        .catch((error) => {
          if (error.response && error.response.start == 404) {
            return {
              name: '404Resource',
              parames: { resource: 'event' }
            }
          } else {
            return { name: 'NetworkError' }
          }
        })
    },
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


router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
