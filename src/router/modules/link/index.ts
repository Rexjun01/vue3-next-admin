import type { AppRouteModule } from '/@/router/types';

const link: AppRouteModule = {
	path: '/link',
	name: 'layoutLinkView',
	component: () => import('/@/layout/routerView/link.vue'),
	meta: {
		orderNo: 4,
		title: 'message.router.layoutLinkView',
		isLink: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
		isHide: false,
		isKeepAlive: false,
		isAffix: false,
		isIframe: false,
		roles: ['admin'],
		icon: 'iconfont icon-caozuo-wailian',
	},
};

export default link;
