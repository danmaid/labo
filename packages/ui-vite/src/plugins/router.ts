import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/rooms', component: () => import('../views/Rooms.vue') },
  { path: '/room-timeline', component: () => import('../views/RoomTimeline.vue') },
  { path: '/class', component: () => import('../views/Class.vue') },
  { path: '/courses', component: () => import('../views/Courses.vue') },
  { path: '/experiments', component: () => import('../views/Experiments.vue') },
  { path: '/schedules', component: () => import('../views/Schedules.vue') },
  {
    path: '/resource',
    component: () => import('../components/EditableTable.vue'),
    props: {
      columns: [
        { text: 'resource', value: 'resource' },
        { text: 'id', value: 'id' },
      ],
    },
  },
  { path: '/user', component: () => import('../views/User.vue') },
  { path: '/column', component: () => import('../views/Column.vue') },
  { path: '/role', component: () => import('../views/Role.vue') },
  { path: '/department', component: () => import('../views/Department.vue') },
  { path: '/department/:id', component: () => import('../views/DepartmentDetail.vue') },
  { path: '/address', component: () => import('../views/Address.vue') },
  { path: '/address/:id', component: () => import('../views/AddressDetail.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
