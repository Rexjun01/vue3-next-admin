import type { AppRouteModule } from '/@/router/types';

const iframesOne: AppRouteModule = {
	path: '/iframesOne',
	name: 'layoutIframeViewOne',
	component: () => import('/@/layout/routerView/iframes.vue'),
	meta: {
		orderNo: 2,
		title: 'message.router.layoutIframeViewOne',
		isLink: 'https://nodejs.org/zh-cn/',
		isHide: false,
		isKeepAlive: true,
		isAffix: true,
		isIframe: true,
		roles: ['admin'],
		icon: 'iconfont icon-neiqianshujuchucun',
	},
};

export default iframesOne;
