import type { AppRouteModule } from '/@/router/types';

const visualizing: AppRouteModule = {
	path: '/visualizing',
	name: 'visualizingIndex',
	component: () => import('/@/layout/routerView/parent.vue'),
	redirect: '/visualizing/visualizingLinkDemo1',
	meta: {
		orderNo: 5,
		title: 'message.router.visualizingIndex',
		isLink: '',
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		roles: ['admin'],
		icon: 'ele-ChatLineRound',
	},
	/**
	 * 打开内置全屏
	 * component 都为 `() => import('/@/layout/routerView/link.vue')`
	 * isLink 链接为内置的路由地址，地址为 staticRoutes 中定义
	 */
	children: [
		{
			path: '/visualizing/visualizingLinkDemo1',
			name: 'visualizingLinkDemo1',
			component: () => import('/@/layout/routerView/link.vue'),
			meta: {
				title: 'message.router.visualizingLinkDemo1',
				isLink: '/visualizingDemo1',
				isHide: false,
				isKeepAlive: false,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'iconfont icon-caozuo-wailian',
			},
		},
		{
			path: '/visualizing/visualizingLinkDemo2',
			name: 'visualizingLinkDemo2',
			component: () => import('/@/layout/routerView/link.vue'),
			meta: {
				title: 'message.router.visualizingLinkDemo2',
				isLink: '/visualizingDemo2',
				isHide: false,
				isKeepAlive: false,
				isAffix: false,
				isIframe: false,
				roles: ['admin'],
				icon: 'iconfont icon-caozuo-wailian',
			},
		},
	],
};

export default visualizing;
