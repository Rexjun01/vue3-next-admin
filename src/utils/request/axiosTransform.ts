import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { RequestOptions, RequestResult } from './type';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
  /** 打包后依旧使用 axios 作为请求 */
  isAxios?: boolean;
}

export abstract class AxiosTransform {
  /**
   * @description请求之前进行流程配置
   */
  beforeRequestHook?: (config: AxiosRequestConfig, options: RequestOptions) => AxiosRequestConfig;
  /**
   * @description 请求已成功处理
   */
  transformResponseHook?: (res: AxiosResponse<RequestResult>, options: RequestOptions) => any;
  /**
   * @description 请求失败处理
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;
  /**
   * @description 请求之前的拦截器
   */
  requestInterceptors?: (config: AxiosRequestConfig, options: CreateAxiosOptions) => AxiosRequestConfig;
  /**
   * @description 请求之后的拦截器
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;
  /**
   * @description 请求之前的拦截器错误处理
   */
  requestInterceptorsCatch?: (error: Error) => void;
  /**
   * @description: 请求之后的拦截器错误处理
   */
  responseInterceptorsCatch?: (error: Error) => void;
}
