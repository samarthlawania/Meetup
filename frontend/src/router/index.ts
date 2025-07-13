import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/Login.vue'
import SignupPage from '@/components/SignupPage.vue'
import CreeateNewMeeting from '@/components/CreeateNewMeeting.vue'
import MyMeeting from '@/components/MyMeeting.vue'
import MeetingRoom from '@/components/MeetingRoom.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
    },
     {
      path: '/signup',
      name: 'signup',
      component: SignupPage,
    },
    {
      path: '/createMeeting',
      name: 'CreateNewMeeting',
      component: CreeateNewMeeting,
    },
     {
      path: '/meetings',
      name: 'MyMeeting',
      component: MyMeeting,
    },
     {
      path: '/meetingsroom',
      name: 'MyMeeting',
      component: MeetingRoom,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
