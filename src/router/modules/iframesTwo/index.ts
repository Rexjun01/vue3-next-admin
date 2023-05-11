import type { AppRouteModule } from '/@/router/types';

const iframesTwo: AppRouteModule = {
	path: '/iframesTwo',
	name: 'layoutIframeViewTwo',
	component: () => import('/@/layout/routerView/iframes.vue'),
	meta: {
		orderNo: 3,
		title: 'message.router.layoutIframeViewTwo',
		isLink: 'https://undraw.co/illustrations',
		isHide: false,
		isKeepAlive: true,
		isAffix: true,
		isIframe: true,
		roles: ['admin'],
		icon: 'iconfont icon-neiqianshujuchucun',
	},
};

export default iframesTwo;
