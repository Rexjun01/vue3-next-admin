import type { AppRouteModule } from '/@/router/types';

const limits: AppRouteModule = {
	path: '/limits',
	name: 'limits',
	component: () => import('/@/layout/routerView/parent.vue'),
	redirect: '/limits/frontEnd',
	meta: {
		orderNo: 9,
		title: 'message.router.limits',
		isLink: '',
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		roles: ['admin', 'common'],
		icon: 'iconfont icon-quanxian',
	},
	children: [
		{
			path: '/limits/frontEnd',
			name: 'limitsFrontEnd',
			component: () => import('/@/layout/routerView/parent.vue'),
			redirect: '/limits/frontEnd/page',
			meta: {
				title: 'message.router.limitsFrontEnd',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: '',
			},
			children: [
				{
					path: '/limits/frontEnd/page',
					name: 'limitsFrontEndPage',
					component: () => import('/@/views/limits/frontEnd/page/index.vue'),
					meta: {
						title: 'message.router.limitsFrontEndPage',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						roles: ['admin', 'common'],
						icon: '',
					},
				},
				{
					path: '/limits/frontEnd/btn',
					name: 'limitsFrontEndBtn',
					component: () => import('/@/views/limits/frontEnd/btn/index.vue'),
					meta: {
						title: 'message.router.limitsFrontEndBtn',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						roles: ['admin', 'common'],
						icon: '',
					},
				},
			],
		},
		{
			path: '/limits/backEnd',
			name: 'limitsBackEnd',
			component: () => import('/@/layout/routerView/parent.vue'),
			meta: {
				title: 'message.router.limitsBackEnd',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: '',
			},
			children: [
				{
					path: '/limits/backEnd/page',
					name: 'limitsBackEndEndPage',
					component: () => import('/@/views/limits/backEnd/page/index.vue'),
					meta: {
						title: 'message.router.limitsBackEndEndPage',
						isLink: '',
						isHide: false,
						isKeepAlive: true,
						isAffix: false,
						isIframe: false,
						roles: ['admin', 'common'],
						icon: '',
					},
				},
			],
		},
	],
};

export default limits;
