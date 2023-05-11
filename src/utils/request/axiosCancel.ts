import type { AxiosRequestConfig, Canceler } from 'axios';
import axios from 'axios';
import { isFunction } from 'lodash-es';

/** 用于存储每个请求的标识和取消功能 */
let pendingMap = new Map<string, Canceler>();

/** 返回 请求方式+请求url */
export const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join('&');

export class AxiosCanceler {
  /** 添加处于 pending 请求 */
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          /** 如果在挂起中没有当前请求，请添加它 */
          pendingMap.set(url, cancel);
        }
      });
  }
  
  /** 清除所有处于 pending 的请求 */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }
  
  /** 移除处于 pending的请求 */
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }
 
  /** 重置 */
  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
