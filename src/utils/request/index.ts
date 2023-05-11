// axios配置  可自行根据项目进行更改，只需更改该文件即可，其他文件可以不动
import type { AxiosResponse } from 'axios';
import type { RequestOptions, RequestResult } from './type';
import { RequestEnum, ResultEnum, ContentTypeEnum } from './type';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import sys from './constant';
import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';
import { isString, isFunction, clone } from 'lodash-es';
import { AxiosRetry } from './axiosRetry';
import { joinTimestamp, formatRequestDate, deepMerge, setObjToUrlParams } from './helper';
import { ElMessageBox } from 'element-plus';
import { useUserInfo } from '../../stores/modules/userInfo';
import { getToken, clearAuthCache } from '/@/utils/auth';

const userStore = useUserInfo();

type Recordable<T = any> = Record<string, T>;

/**
 * @description: 请求设置
 */
const transform: AxiosTransform = {
	/**
	 * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
	 */
	transformResponseHook: (res: AxiosResponse<RequestResult>, options: RequestOptions) => {
		const { isTransformResponse, isReturnNativeResponse } = options;
		// 是否返回原生响应头 比如：需要获取响应头时使用该属性
		if (isReturnNativeResponse) {
			return res;
		}

		// 不进行返回数据处理，直接返回
		if (!isTransformResponse) {
			return res.data;
		}

		// 错误的时候返回
		if (!res.data) {
			throw new Error(sys.apiRequestFailed);
		}

		//  这里 code，data，msg为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
		const { code, data, msg } = res.data;

		// 这里逻辑可以根据项目进行修改
		const hasSuccess = res.data && code === ResultEnum.SUCCESS;
		if (hasSuccess) {
			return data;
		}

		// 在此处根据自己项目的实际情况对不同的code执行不同的操作
		// 如果不希望中断当前请求，请return数据，否则直接抛出异常即可
		// let errorMsg = '';
		// switch (code) {
		//   case ResultEnum.TIMEOUT:
		//     errorMsg = sys.timeoutMessage;
		//     // context.timeoutFunction?.();
		//     console.log('接口超时了:',errorMsg);

		//     break;
		//   default:
		//     if (msg) {
		//       errorMsg = msg;
		//     }
		// }

		//错误时设置弹窗（暂不需要）
		// if (options.errorMessageMode === 'modal') {
		//   context.errorModalFunction({
		//     title: sys.errorTip,
		//     content: errorMsg
		//   });
		// } else if (options.errorMessageMode === 'message') {
		//   context.errorFunction(errorMsg);
		// }

		throw new Error(msg || sys.apiRequestFailed);
	},

	// 请求之前处理config
	beforeRequestHook: (config, options) => {
		const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options;

		if (apiUrl) {
			const _apiUrl = isString(apiUrl) ? apiUrl : isFunction(apiUrl) ? apiUrl?.() : '';
			config.url = `${_apiUrl}${config.url}`;
		}
		const params = config.params || {};
		const data = config.data || false;

		formatDate && data && !isString(data) && formatRequestDate(data);

		// 处理 GET 请求
		if (config.method?.toUpperCase() === RequestEnum.GET) {
			if (!isString(params)) {
				// 给 get 请求加上时间戳参数，避免从缓存中拿数据。
				config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
			} else {
				// 兼容restful风格
				config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
				config.params = undefined;
			}
		} else {
			// 处理其他请求
			if (!isString(params)) {
				formatDate && formatRequestDate(params);
				if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length > 0) {
					config.data = data;
					config.params = params;
				} else {
					// 非GET请求如果没有提供data，则将params视为data
					config.data = params;
					config.params = undefined;
				}
				if (joinParamsToUrl) {
					config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
				}
			} else {
				// 兼容restful风格
				config.url = config.url + params;
				config.params = undefined;
			}
		}
		return config;
	},

	/**
	 * @description: 请求拦截器处理
	 */
	requestInterceptors: (config, options) => {
		// 请求之前处理config
		const token = getToken();
		// console.log('tokentoken', token);

		if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
			(config as Recordable).headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token;
		}
		return config;
	},

	/**
	 * @description: 响应拦截器处理
	 */
	responseInterceptors: (res: AxiosResponse<any>) => {
		return res;
	},

	/**
	 * @description: 响应错误处理
	 */
	responseInterceptorsCatch: (error: any) => {
		// context.errorLogFunction?.(error);
		// console.log('报错了111');

		const { response, code, message, config } = error || {};
		const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
		const msg: string = response?.data?.error?.message ?? '';
		const err: string = error?.toString?.() ?? '';
		let errMessage = '';

		try {
			if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
				errMessage = sys.apiTimeoutMessage;
			}
			if (err?.includes('Network Error')) {
				errMessage = sys.networkExceptionMsg;
			}

			if (errMessage) {
				// 错误提示的弹框集成在axios中，实际应用可以剔除
				// if (errorMessageMode === 'modal') {
				//   context.errorModalFunction({
				//     title: sys.errorTip,
				//     content: errMessage
				//   });
				// } else if (errorMessageMode === 'message') {
				//   context.errorFunction(errMessage);
				// }
				// Session.clear(); // 清除浏览器全部临时缓存
				clearAuthCache();
				userStore.resetState();
				window.location.href = '/'; // 去登录页
				ElMessageBox.alert('错误提示', errMessage);
				return Promise.reject(error);
			}
		} catch (error) {
			throw new Error(error as unknown as string);
		}
		checkStatus(error?.response?.status, msg, errorMessageMode);

		// 添加自动重试机制 保险起见 只针对GET请求(酌情使用)
		const retryRequest = new AxiosRetry();
		const { isOpenRetry } = config.requestOptions.retryRequest;
		config.method?.toUpperCase() === RequestEnum.GET &&
			isOpenRetry &&
			// @ts-ignore
			retryRequest.retry(axiosInstance, error);

		return Promise.reject(error);
	},
};

const createAxios = (opt?: Partial<CreateAxiosOptions>) => {
	// const isDev = process.env.NODE_ENV === 'development';

	const requestConfig = deepMerge(
		{
			// 添加token前缀
			// authentication schemes，e.g: Bearer
			authenticationScheme: 'Bearer',
			// 接口超时关闭请求时间
			timeout: 30 * 1000,

			// 基础接口地址,dev和线上环境读取的.env文件不一样，取的VITE_API_URL也不一样
			baseURL: import.meta.env.VITE_API_URL,

			// 如果是form-data格式
			// headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
			// 数据处理方式
			headers: { 'Content-Type': ContentTypeEnum.JSON },

			// 执行transform中请求、相应拦截器、错误处理等方法
			transform: clone(transform),

			/** 配置项，下面的选项都可以在独立的接口请求中覆盖*/
			requestOptions: {
				// 接口地址
				//  apiUrl: () => context.apiUrl,

				// 是否返回原生响应头 比如：需要获取响应头时使用该属性
				isReturnNativeResponse: false,
				// 需要对返回数据进行处理，就是是否需要处理成解构好的data数据
				isTransformResponse: false,
				// post请求的时候添加参数到url
				joinParamsToUrl: false,
				// 针对post请求，格式化提交参数时间，去除空格
				formatDate: true,

				// 针对get请求，是否加入时间戳,请求加上时间戳参数，避免从缓存中拿数据
				joinTime: false,
				// 忽略重复请求（两次同样的请求，如果第二次比第一次请求的快，则将第一次的请求取消）
				ignoreCancelToken: true,
				// 是否携带token
				// withToken: isDev,
				withToken: false,

				// 重试机制配置
				retryRequest: {
					isOpenRetry: true,
					// 重试阈值，最多请求多少次
					count: 5,
					// 重试间隔时间
					waitTime: 100,
				},
			},
		},
		opt || {}
	);

	// 兼容现有app写法，封装两套axios
	return new VAxios(requestConfig);
};

export const request = createAxios();

// 兼容现有app写法，封装两套axios
// export const requestAxios = createAxios({ isAxios: true });
