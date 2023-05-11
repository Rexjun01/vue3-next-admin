import { isObject, isString } from 'lodash-es';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
type Recordable<T = any> = Record<string, T>;
export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object

/**
 * @description 给 get 请求后拼上 _t=当前时间的时间戳，可以避免 http 缓存
 */
export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description 格式化请求参数时间,主要是去掉了字符串的空格
 * 另外如果请求参数是 dayjs() 将会进行 format 格式为 YYYY-MM-DD HH:mm:ss
 */
 export const formatRequestDate = (params: Recordable) => {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }
  for (const key in params) {
    const format = params[key]?.format ?? null;
    if (format && typeof format === 'function') {
      params[key] = params[key].format(DATE_TIME_FORMAT);
    }
    if (isString(key)) {
      const value = params[key];
      if (value) {
        try {
          params[key] = isString(value) ? value.trim() : value;
        } catch (error: any) {
          throw new Error(error);
        }
      }
    }
    if (isObject(params[key])) {
      formatRequestDate(params[key]);
    }
  }
};

export const is = (val: unknown, type: string) => {
  return toString.call(val) === `[object ${type}]`;
};
export const isObjectLastest = (val: any): val is Record<any, any> => val !== null && is(val, 'Object');

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObjectLastest(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}

export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}
