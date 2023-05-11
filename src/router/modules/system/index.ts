import type { AppRouteModule } from '/@/router/types';

const system: AppRouteModule = {
	path: '/system',
	name: 'system',
	component: () => import('/@/layout/routerView/parent.vue'),
	redirect: '/system/menu',
	meta: {
		orderNo: 13,
		title: 'message.router.system',
		isLink: '',
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		roles: ['admin'],
		icon: 'iconfont icon-xitongshezhi',
	},
	children: [
		{
			path: '/system/menu',
			name: 'systemMenu',
			component: () => import('/@/views/system/menu/index.vue'),
			meta: {
				title: 'message.router.systemMenu',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'iconfont icon-caidan',
			},
		},
		{
			path: '/system/role',
			name: 'systemRole',
			component: () => import('/@/views/system/role/index.vue'),
			meta: {
				title: 'message.router.systemRole',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'ele-ColdDrink',
			},
		},
		{
			path: '/system/user',
			name: 'systemUser',
			component: () => import('/@/views/system/user/index.vue'),
			meta: {
				title: 'message.router.systemUser',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'iconfont icon-icon-',
			},
		},
		{
			path: '/system/dept',
			name: 'systemDept',
			component: () => import('/@/views/system/dept/index.vue'),
			meta: {
				title: 'message.router.systemDept',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'ele-OfficeBuilding',
			},
		},
		{
			path: '/system/dic',
			name: 'systemDic',
			component: () => import('/@/views/system/dic/index.vue'),
			meta: {
				title: 'message.router.systemDic',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'ele-SetUp',
			},
		},
	],
};

export default system;
