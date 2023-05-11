export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  /** 将请求参数拼接到url */
  joinParamsToUrl?: boolean;
  /** 格式化提交参数时间,针对post请求，去除空格 */
  formatDate?: boolean;
  /** 是否处理请求结果 */
  isTransformResponse?: boolean;
  /** 是否返回原生响应头 比如：需要获取响应头时使用该属性 */
  isReturnNativeResponse?: boolean;
  /** 公共的接口请求地址 */
  apiUrl?: string | (() => string);
  /** 是否加入时间戳,请求加上时间戳参数，避免从缓存中拿数据 */
  joinTime?: boolean;
  /** 是否忽略重新请求（两次同样的请求，如果第二次比第一次请求的快，则将第一次的请求取消） */
  ignoreCancelToken?: boolean;
  /** 是否需要 token */
  withToken?: boolean;
}

/* 请求返回结果类型定义*/
export interface RequestResult<T = any> {
  code: number;
  msg: string;
  data: T;
}

/**
 * @description: Request result set
 */
 export enum ResultEnum {
  SUCCESS = 0,
  ERROR = 100,
  TIMEOUT = 401,
  TYPE = 'success'
}

/**
 * @description: request method
 */
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

/**
 * @description:  contentType
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8'
}
