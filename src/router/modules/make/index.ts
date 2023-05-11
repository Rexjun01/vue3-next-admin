import type { AppRouteModule } from '/@/router/types';

const make: AppRouteModule = {
	path: '/make',
	name: 'makeIndex',
	component: () => import('/@/layout/routerView/parent.vue'),
	redirect: '/make/selector',
	meta: {
		orderNo: 8,
		title: 'message.router.makeIndex',
		isLink: '',
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		roles: ['admin'],
		icon: 'iconfont icon-siweidaotu',
	},
	children: [
		{
			path: '/make/selector',
			name: 'makeSelector',
			component: () => import('/@/views/make/selector/index.vue'),
			meta: {
				title: 'message.router.makeSelector',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'iconfont icon-xuanzeqi',
			},
		},
		{
			path: '/make/noticeBar',
			name: 'makeNoticeBar',
			component: () => import('/@/views/make/noticeBar/index.vue'),
			meta: {
				title: 'message.router.makeNoticeBar',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'ele-Bell',
			},
		},
		{
			path: '/make/svgDemo',
			name: 'makeSvgDemo',
			component: () => import('/@/views/make/svgDemo/index.vue'),
			meta: {
				title: 'message.router.makeSvgDemo',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'fa fa-thumbs-o-up',
			},
		},
		{
			path: '/make/tableDemo',
			name: 'makeTableDemo',
			component: () => import('/@/views/make/tableDemo/index.vue'),
			meta: {
				title: 'message.router.makeTableDemo',
				isLink: '',
				isHide: false,
				isKeepAlive: true,
				isAffix: false,
				isIframe: false,
				roles: ['admin', 'common'],
				icon: 'iconfont icon-shuju',
			},
		},
	],
};

export default make;
