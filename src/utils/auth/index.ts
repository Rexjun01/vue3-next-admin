import { Persistent } from '/@/utils/cache/persistent';
import { TOKEN_KEY } from '/@/enums/cacheEnum';

export function getToken() {
	return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: any) {
	const fn = Persistent.getLocal;
	return fn(key) as T;
}

export function setAuthCache(key: any, value: any) {
	const fn = Persistent.setLocal;
	return fn(key, value, true);
}

export function clearAuthCache(immediate = true) {
	const fn = Persistent.clearLocal;
	return fn(immediate);
}
