import type { ErrorMessageMode } from './type';
// import { context } from '../bridge';
import sys from './constant';

export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = 'message'): void {
	let errMessage = '';

	switch (status) {
		case 400:
			errMessage = `${msg}`;
			break;
		case 401:
			// 表示客户端请求错误，这里需要做点事，比如退出登录，token失效
			// context.unauthorizedFunction?.(msg);
			errMessage = sys.errMsg403;

			break;
		case 403:
			errMessage = sys.errMsg403;
			break;
		case 404:
			errMessage = sys.errMsg404;
			break;
		case 405:
			errMessage = sys.errMsg405;
			break;
		case 408:
			errMessage = sys.errMsg408;
			break;
		case 500:
			errMessage = sys.errMsg500;
			break;
		case 501:
			errMessage = sys.errMsg501;
			break;
		case 502:
			errMessage = sys.errMsg502;
			break;
		case 503:
			errMessage = sys.errMsg503;
			break;
		case 504:
			errMessage = sys.errMsg504;
			break;
		case 505:
			errMessage = sys.errMsg505;
			break;
		default:
	}

	if (errMessage) {
		console.log('当前报错在checkStatus中:', errMessage);
	}
}
