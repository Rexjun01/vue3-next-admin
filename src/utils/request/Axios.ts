import type { CreateAxiosOptions } from './axiosTransform';
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import type { RequestOptions, RequestResult } from './type';
import axios from 'axios';
// @ts-ignore
import qs from 'qs';
import { isFunction, cloneDeep } from 'lodash-es';
import { AxiosCanceler } from './axiosCancel';
import { ContentTypeEnum, RequestEnum } from './type';
export * from './axiosTransform';
// import { showFailToast } from 'dzh/src/common';

export class VAxios {
	/**
	 * @description 构造器做了三件事：
	 *  1.获取 options 参数
	 *  2.使用 options 中的参数创建 axios 实例对象
	 *  3.调用拦截器方法
	 */

	private axiosInstance: AxiosInstance;
	private readonly options: CreateAxiosOptions;

	constructor(options: CreateAxiosOptions) {
		this.options = options;
		this.axiosInstance = axios.create(options);
		this.setupInterceptors();
	}

	private createAxios(config: CreateAxiosOptions): void {
		this.axiosInstance = axios.create(config);
	}

	private getTransform() {
		const { transform } = this.options;
		return transform;
	}

	//获取 axios 实例
	getAxios(): AxiosInstance {
		return this.axiosInstance;
	}

	//axios 添加 config
	configAxios(config: CreateAxiosOptions) {
		if (!this.axiosInstance) {
			return;
		}
		this.createAxios(config);
	}

	//添加 axios 请求头
	setHeader(headers: any): void {
		if (!this.axiosInstance) {
			return;
		}
		Object.assign(this.axiosInstance.defaults.headers, headers);
	}

	private setupInterceptors() {
		const transform = this.getTransform();
		if (!transform) {
			return;
		}
		const { requestInterceptors, requestInterceptorsCatch, responseInterceptors, responseInterceptorsCatch } = transform;

		const axiosCanceler = new AxiosCanceler();

		/** 请求拦截器配置处理 */
		this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
			// console.log('请求拦截器处理开始 config', config);
			// 如果打开取消重复请求，则禁止取消重复请求，这里获取的是外部设置的
			// @ts-ignore
			const { ignoreCancelToken } = config.requestOptions;

			// 查看外部的设置中是否加入了忽略重复请求，如果加入了，则取用外部的，如果没加入则采用项目中配置的

			const ignoreCancel = ignoreCancelToken !== undefined ? ignoreCancelToken : this.options.requestOptions?.ignoreCancelToken;

			// 如果没有开启忽略重复请求，将请求添加到 axiosCanceler 中
			!ignoreCancel && axiosCanceler.addPending(config);

			// 外部是否也加入了请求拦截器，如果加入了则采用外部的请求拦截器处理后返回 config
			// 本项目的 transform 中加入了请求拦截器，主要用于校验 token
			if (requestInterceptors && isFunction(requestInterceptors)) {
				config = requestInterceptors(config, this.options);
			}
			return config;
		}, undefined);

		// 请求拦截器错误捕获
		requestInterceptorsCatch &&
			isFunction(requestInterceptorsCatch) &&
			this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

		// 响应结果拦截器处理
		this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
			res && axiosCanceler.removePending(res.config);
			if (responseInterceptors && isFunction(responseInterceptors)) {
				res = responseInterceptors(res);
			}
			return res;
		}, undefined);

		// 响应结果拦截器错误捕获
		responseInterceptorsCatch &&
			isFunction(responseInterceptorsCatch) &&
			this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
	}

	supportFormData(config: AxiosRequestConfig) {
		const headers = config.headers || this.options.headers;
		const contentType = headers?.['Content-Type'] || headers?.['content-type'];

		if (contentType !== ContentTypeEnum.FORM_URLENCODED || !Reflect.has(config, 'data') || config.method?.toUpperCase() === RequestEnum.GET) {
			return config;
		}

		return {
			...config,
			data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
		};
	}

	/** get、post请求等都是两组配置参数合并的
	 * 第一个config: AxiosRequestConfig是axios自带的参数
	 * 第二个options?: RequestOptions是我们自定义的配置项，其中options在index.js中有初始化的定义方式，但是外部传入的话会覆盖原来的配置
	 */

	get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'GET' }, options);
	}

	post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'POST' }, options);
	}

	put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'PUT' }, options);
	}

	delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		return this.request({ ...config, method: 'DELETE' }, options);
	}

	request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
		let conf: CreateAxiosOptions = cloneDeep(config);
		const transform = this.getTransform();

		const { requestOptions } = this.options;
		const opt: RequestOptions = Object.assign({}, requestOptions, options);

		const { beforeRequestHook, requestCatchHook, transformResponseHook } = transform || {};

		if (beforeRequestHook && isFunction(beforeRequestHook)) {
			conf = beforeRequestHook(conf, opt);
		}
		conf.requestOptions = opt;
		conf = this.supportFormData(conf);

		return new Promise((resolve, reject) => {
			this.axiosInstance
				.request<any, AxiosResponse<RequestResult>>(conf)
				.then((res: AxiosResponse<RequestResult>) => {
					// console.log('请求数据成功', res);
					if (transformResponseHook && isFunction(transformResponseHook)) {
						try {
							const ret = transformResponseHook(res, opt);
							resolve(ret);
						} catch (err) {
							reject(err || new Error('request error!'));
						}
						return;
					}
					resolve(res as unknown as Promise<T>);
				})
				.catch((e: Error | AxiosError) => {
					// showFailToast(e.message);
					alert(e.message);

					if (requestCatchHook && isFunction(requestCatchHook)) {
						reject(requestCatchHook(e, opt));
						return;
					}
					if (axios.isAxiosError(e)) {
						// Todo
					}
					reject(e);
				});
		});
	}
}
