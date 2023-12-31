export const menuLink = [
	{
		path: '/dashboard',
		name: 'dashboard',
		title: 'Bosh sahifa',
		icon: 'home-filled',
		component: () => import('@/views/dashboardPage.vue'),
	},
	{
		path: '/products',
		name: 'products',
		title: 'Mahsulotlar',
		icon: 'document',
		component: () => import('@/views/products/productPage.vue'),
	},
	{
		path: '/price',
		name: 'price',
		title: 'Narxlar',
		icon: 'money',
		component: () => import('@/views/products/productPrice.vue'),
	},
	{
		path: '/food',
		name: 'food',
		title: 'Ovqatlar',
		icon: 'bowl',
		component: () => import('@/views/foods/foodPage.vue'),
	},
	{
		path: '/time',
		name: 'time',
		title: 'Ovqat vaqtlari',
		icon: 'fork-spoon',
		component: () => import('@/views/timePage.vue'),
	},
	{
		path: '/menu',
		name: 'menu',
		title: 'Menyu',
		icon: 'memo',
		component: () => import('@/views/menu/menuPage.vue'),
	},
]
