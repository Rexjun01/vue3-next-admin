import server from '/@/utils/request';
import { request } from '/@/utils/request/index';

enum DemoUrl {
	// 测试接口
	url = '/openapi/promo/template',
}

export const getDemoRequest = () => request.get({ url: DemoUrl.url });

/**
 * （不建议写成 request.post(xxx)，因为这样 post 时，无法 params 与 data 同时传参）
 *
 * 登录api接口集合
 * @method signIn 用户登录
 * @method signOut 用户退出登录
 */
export function useLoginApi() {
	return {
		signIn: (data: object) => {
			return server({
				url: '/user/signIn',
				method: 'post',
				data,
			});
		},
		signOut: (data: object) => {
			return server({
				url: '/user/signOut',
				method: 'post',
				data,
			});
		},
	};
}
