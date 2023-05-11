import type { AppRouteModule } from '/@/router/types';

const chart: AppRouteModule = {
	path: '/chart',
	name: 'chartIndex',
	component: () => import('/@/views/chart/index.vue'),
	meta: {
		orderNo: 1,
		title: 'message.router.chartIndex',
		isLink: '',
		isHide: false,
		isKeepAlive: true,
		isAffix: false,
		isIframe: false,
		roles: ['admin', 'common'],
		icon: 'iconfont icon-ico_shuju',
	},
};

export default chart;
