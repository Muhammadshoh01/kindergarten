import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

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
			],
		},
	],
})

export default router
