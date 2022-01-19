import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/rooms', component: () => import('../views/Rooms.vue') },
  { path: '/room-timeline', component: () => import('../views/RoomTimeline.vue') },
  { path: '/classes', component: () => import('../views/Classes.vue') },
  { path: '/courses', component: () => import('../views/Courses.vue') },
  { path: '/experiments', component: () => import('../views/Experiments.vue') },
  { path: '/schedules', component: () => import('../views/Schedules.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
