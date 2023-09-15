import { createRouter, createWebHistory } from 'vue-router'

import store from "../store"

import HomeView from '../views/HomeView.vue'
import CourseView from '../views/CourseView.vue'
import CoursesView from '../views/CoursesView.vue'
import TutorsView from '../views/TutorsView.vue'
import CompaniesView from '../views/CompaniesView.vue'
import ReportView from '../views/ReportView.vue'
import SignUpView from '../views/SignUpView.vue'
import LogInView from '../views/LogInView.vue'
import MyAccountView from '../views/MyAccountView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/reports',
    name: 'report',
    component: ReportView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: SignUpView
  },
  {
    path: '/log-in',
    name: 'log-in',
    component: LogInView
  },
  {
    path: '/my-account',
    name: 'my-account',
    component: MyAccountView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/course/:course_id/',
    name: 'course',
    component: CourseView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/courses',
    name: 'courses',
    component: CoursesView,
    meta: {
      requireLogin: true
    }
  },
  {
    path: '/tutors',
    name: 'tutors',
    component: TutorsView,
    meta: {
      requireLogin: true
    }
  },

  {
    path: '/companies',
    name: 'companies',
    component: CompaniesView,
    meta: {
      requireLogin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) =>{
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next({name: 'log-in', query: {to: to.path} });
  } else {
    next()
  }
})

export default router
