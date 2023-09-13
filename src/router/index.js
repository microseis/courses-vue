import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CourseView from '../views/CourseView.vue'
import TutorsView from '../views/TutorsView.vue'
import CompaniesView from '../views/CompaniesView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/chart',
    name: 'chart',
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
    component: CourseView
  },

  {
    path: '/tutors',
    name: 'tutors',
    component: TutorsView
  },

  {
    path: '/companies',
    name: 'companies',
    component: CompaniesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
