import type { AppRouteModule } from '/@/router/types';

const personal: AppRouteModule = {
	path: '/personal',
	name: 'personal',
	component: () => import('/@/views/personal/index.vue'),
	meta: {
		orderNo: 14,
		title: 'message.router.personal',
		isLink: '',
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		roles: ['admin', 'common'],
		icon: 'iconfont icon-gerenzhongxin',
	},
};

export default personal;
