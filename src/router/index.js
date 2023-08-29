import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '../stores/user/auth'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			redirect: '/dashboard',
			component: () => import('@/layout/mainLayout.vue'),
			children: [
				{
					path: '/dashboard',
					name: 'dashboard',
					component: () => import('@/views/dashboardPage.vue'),
				},
			],
		},
		{
			path: '/',
			component: () => import('@/layout/authLayout.vue'),
			children: [
				{
					path: '/reg',
					name: 'reg',
					component: () => import('@/views/auth/regAuth.vue'),
				},
				{
					path: '/login',
					name: 'login',
					component: () => import('@/views/auth/loginAuth.vue'),
				},
			],
		},
	],
})

router.beforeEach((to, from, next) => {
	console.log(to.name)
	if (['login', 'reg'].includes(to.name)) {
		next()
	} else {
		const authStore = useAuthStore()
		authStore.checkUser()
		next()
	}
})

export default router
