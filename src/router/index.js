import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/Home',
		component: Home,
		redirect: '/Main',
		children: [
			{
				path: '/Main',
				component: () => import('../views/Main')
			},
			{
				path: '/Class',
				component: () => import('../views/Class')
			},
			{
				path: '/Shop',
				component: () => import('../views/Shop')
			},
			{
				path: '/My',
				component: () => import('../views/My')
			},

		]
	},
	{
		path: '/Page',
		name: 'Page',
		component: () => import('@/views/Page')
	},
	{
		path: '/Seek',
		name: 'Seek',
		component: () => import('@/views/Seek')
	},

	{
		path: '/Meg',
		name: 'Meg',
		component: () => import('@/views/Meg')
	},
	{
		path: '/Shezhi',
		name: 'Shezhi',
		component: () => import('@/views/Shezhi')
	},
	{
		path: '/Yuexq',
		name: 'Yuexq',
		component: () => import('@/views/Yuexq')
	},
	{
		path: '/Dingdan',
		name: 'Dingdan',
		component: () => import('@/views/Dingdan')
	},
	
	{
		path: '/Zhifu',
		name: 'Zhifu',
		component: () => import('@/views/Zhifu')
	},{
		path: '/Jifen',
		name: 'Jifen',
		component: () => import('@/views/Jifen')
	},
	{
		path: '/My_dingdan',
		name: 'My_dingdan',
		component: () => import('@/views/My_dingdan')
	},
	{
		path: '/My_shoucang',
		name: 'My_shoucang',
		component: () => import('@/views/My_shoucang')
	},
	{
		path: '/My_jilu',
		name: 'My_jilu',
		component: () => import('@/views/My_jilu')
	},
	{
		path: '/Over',
		name: 'Over',
		component: () => import('@/views/Over')
	},

]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
