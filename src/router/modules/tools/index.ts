import type { AppRouteModule } from '/@/router/types';

const tools: AppRouteModule = {
	path: '/tools',
	name: 'tools',
	component: () => import('/@/views/tools/index.vue'),
	meta: {
		orderNo: 11,
		title: 'message.router.tools',
		isLink: '',
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		roles: ['admin', 'common'],
		icon: 'iconfont icon-gongju',
	},
};

export default tools;
