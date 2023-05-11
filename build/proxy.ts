/**
 * .env.development 的 代理配置
 */
import type { ProxyOptions } from 'vite';
/** 第一项被代理的 api 地址，第二项代理的 url 路径 */
type ProxyItem = [string, string];
/** 方法接收的参数 */
type ProxyList = ProxyItem[];
/**
 * @description Vite 代理所接收对象类型
 * @author wfd
 * @date 2021/10/9 14:08
 * @example
   使用 record 包含表示每一个对象的 key 的类型都是 string
   value 的类型为 ProxyOptions 联合上下面的属性
   { rewrite: (path: string) => string }
   此属性表示新增一个 rewrite 属性，rewrite 是一个函数接受一个 字符串 path 参数，最后返回一个字符串

   最新的 ProxyOptions 中已经包含了上述属性
 */
type ProxyTargetList = Record<string, ProxyOptions>;
// type ProxyTargetList = Record<string, ProxyOptions & { rewrite: (path: string) => string }>;

/**
 * @description 转换从 .env 文件中获取的对象
 * @param envConf
 */
export function wrapperEnv(envConf: any): any {
	// console.log(envConf, 111)
	// 创建一个对象来存储转换的键值
	const ret: any = {};

	/**
   * @description wrapperEnv
   * @author Rex
   * @date 2021/10/8 14:19
   * @example
   * Object.keys(envConf) = [
        'VITE_USE_MOCK',
        'VITE_PUBLIC_PATH',
        'VITE_PROXY',
        'VITE_DROP_CONSOLE',
        'VITE_GLOB_API_URL',
        'VITE_GLOB_UPLOAD_URL',
        'VITE_GLOB_API_URL_PREFIX',
        'VITE_PORT',
        'VITE_GLOB_APP_TITLE',
        'VITE_GLOB_APP_SHORT_NAME'
     ]
   */
	for (const envName of Object.keys(envConf)) {
		/**
     * @description
       realName 是每一个配置对应的 value
       中间的正则替换就是将\\n替换成\n。
       console.log('asda\\\n\\n\n'.replace(/\n/g, '\n')) =>asda\ [回车\n] \n [回车\n]
       console.log('asda\\\n\\n\n'.replace(/\\n/g, '\n'))=>asda\ [回车\n] [回车\n] [回车\n]
       console.log('asda\\\n\\n\n'.replace(/\\\n/g, '\n'))=>asda [回车\n] \n [回车\n]
     */
		let realName = envConf[envName].replace(/\\n/g, '\n');
		// 将 'true' 或者 'false' 的字符串转换为 boolean 对应的 true 或者 false
		realName = realName === 'true' ? true : realName === 'false' ? false : realName;

		// 端口转换成 number 类型
		if (envName === 'VITE_PORT') {
			realName = Number(realName);
		}

		// 将代理配置转换成数组
		if (envName === 'VITE_PROXY' && realName) {
			try {
				realName = JSON.parse(realName.replace(/'/g, '"'));
			} catch (error) {
				realName = '';
			}
		}
		// 将转换后的属性值 realName 赋值给 ret 对应的每一个键
		ret[envName] = realName;

		// 将原始的值也就是未转换的值赋值给 process.env
		if (typeof realName === 'string') {
			process.env[envName] = realName;
		} else if (typeof realName === 'object') {
			process.env[envName] = JSON.stringify(realName);
		}
	}

	return ret;
}

/**  https 类型的 URL 的匹配正则 */
const httpsRE = /^https:\/\//;

/**
 * @description 生成 Vite 的 proxy 代理配置的方法
 * @example
 * list = [
      [ '/basic-api', 'http://localhost:3000' ],
      [ '/upload', 'http://localhost:3300/upload' ]
   ]
 * @param list 传入的代理对象数组
 */
export function createProxy(list: ProxyList = []) {
	const ret: ProxyTargetList = {};

	/**
	 * @description [prefix, target] 相当于每一个 item 如： [ '/basic-api', 'http://localhost:3000' ]
	 */
	for (const [prefix, target] of list) {
		// 判断是否为 https 类型的地址
		const isHttps = httpsRE.test(target);

		// https://github.com/http-party/node-http-proxy#options
		ret[prefix] = {
			// 要被代理的目标 url
			target,
			// 是false：请求头中host仍然是浏览器发送过来的host；如果设置成true：发送请求头中host会设置成target。
			changeOrigin: true,
			// 是否代理 websocket
			ws: true,
			rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
			// https 的地址需要 secure=false
			...(isHttps ? { secure: false } : {}),
		};
	}
	return ret;
}
