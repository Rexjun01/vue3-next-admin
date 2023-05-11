/* 这里放格式化相关的工具函数 */
// import { transformUrl } from '@/utils/url';

export const formatPhone = (value: string) => {
	let showValue = value.replace(/\D/g, '').trim();
	if (showValue.length > 11) {
		showValue = showValue.substr(0, 11);
	}
	let renderValue = '';

	for (let i = 0; i < showValue.length; i++) {
		renderValue += showValue[i];
		if (i === 2 || i === 6) {
			renderValue += ' ';
		}
	}
	return renderValue;
};

export const formatInputPhone = (e: any) => {
	const {
		target: { value },
		keyCode,
	} = e;
	let renderValue = formatPhone(value);
	const renderLen = renderValue.length;
	if (keyCode === 8 && renderValue[renderLen - 1] === ' ') {
		renderValue = renderValue.substr(0, renderLen - 1);
	}
	return renderValue;
};
//数字千分位并保留fixed位小数
export const formatNumber = (value: number | string, fixed = 2) => {
	if (isNaN(parseFloat(`${value}`))) return '';
	value = parseFloat(`${value}`)
		.toFixed(fixed)
		.replace(/(\d)(?=(\d{3})+(\.\d*)?$)/g, '$1,');
	return value;
};

//数字千分位并截取fixed位小数
export const formatNumberAndFixedFloat = (value: number | string, fixed: number | undefined | false = 2, mustNotZero: boolean = false) => {
	if (value === '' || isNaN(parseFloat(`${value}`))) return '';
	let result = value;

	if (value.toString().indexOf('e-') !== -1 && typeof value === 'number') {
		value = value.toFixed(18).replace(/(\.\d+[1-9])0+$/, '$1');
	}

	let arr = value.toString().split('.');

	if (arr.length) {
		if (mustNotZero && arr[1] && typeof fixed === 'number') {
			// 很有值小数截位时，必须 非0 如：0.00123 保留2位小数 0.001
			let idx = arr[1].split('').findIndex((s) => s !== '0');
			if (idx !== -1) ++idx;

			if (fixed < idx) fixed = idx;
		}

		arr[0] = arr[0].replace(/(\d)(?=(\d{3})+(\.\d*)?$)/g, '$1,');

		if (typeof fixed === 'number') {
			if (typeof arr[1] === 'undefined') arr[1] = '';

			arr[1] = arr[1].substr(0, fixed).padEnd(fixed, '0');
		}

		result = fixed === 0 ? arr[0] : arr.join('.');
	}

	return result;
};

//数字千分位并保留fixed位小数
export const formatMoney = (value: number | string, fixed = 2) => {
	if (isNaN(parseFloat(`${value}`))) return '';
	value = parseFloat(`${value}`).toFixed(fixed);
	return value;
};
export const emptyFilter = (value: number | string, blank = '--') => {
	return value || blank;
};

//货币单位转换
//元转换为万元、亿元并保留fixed位小数

export const formatTransformMoney = (value: number | string, unit: string, fixed = 2): string => {
	if (isNaN(parseFloat(`${value}`))) return '';
	let _unit: string = unit === 'CNY' || unit === '人民币' || !unit ? '' : '(' + unit + ')';
	let _val: string = parseInt(`${value}`).toString();
	let len: number = _val.length;
	let targetVal: string = '';
	if (len > 8) {
		targetVal = (parseFloat(`${value}`) / 100000000).toFixed(fixed).toString() + '亿' + _unit;
	} else if (len > 4) {
		targetVal = (parseFloat(`${value}`) / 10000).toFixed(fixed).toString() + '万' + _unit;
	} else {
		targetVal = parseFloat(`${value}`).toFixed(fixed).toString() + '元' + _unit;
	}

	return targetVal;
};

//货币单位转换
//元转换为万元、亿元并保留fixed位小数

export const formatThousandformMoney = (value: number | string, unit: string, fixed = 2): string => {
	if (isNaN(parseFloat(`${value}`))) return '';
	let _unit: string = unit === 'CNY' || unit === '人民币' || !unit ? '' : '(' + unit + ')';
	let _val: string = parseInt(`${value}`).toString();
	let len: number = _val.length;
	let targetVal: string = '';
	if (len > 4) {
		targetVal = (parseFloat(`${value}`) / 10000).toFixed(fixed).toString() + '亿' + _unit;
	} else {
		targetVal = parseFloat(`${value}`).toFixed(fixed).toString() + '万' + _unit;
	}
	return targetVal;
};

// 将字符串中的正则保留字转为带转义字符串
export function escape(s: string) {
	return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
}

export function hashCode(str: string, asString = true, seed = 0x811c9dc5) {
	let i, l;
	let hval = seed;

	for (i = 0, l = str.length; i < l; i++) {
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	if (asString) {
		// Convert to 8 digit hex string
		return ('0000000' + (hval >>> 0).toString(16)).substr(-8);
	}
	return hval >>> 0;
}

//四舍五入保留两位小数
export function keepTwoDecimal(num: any) {
	let result = parseFloat(num);
	if (isNaN(result)) {
		return num;
	}
	// result = Math.round(num * 100) / 100;
	// return Math.round(parseFloat(result.toFixed(2))*100)/100;
	// return (parseInt((result * 100).toString()) / 100).toFixed(2);
	return (Math.round(num * 100) / 100).toFixed(2);
}

// <=0.005舍
export function unUsedkeepTwoDecimal(num: any) {
	let result = parseFloat(num);
	if (isNaN(result)) {
		return num;
	}
	let tempNum = parseInt((result * 1000000).toString())
		.toString()
		.split('')
		.reverse();
	if (parseInt(tempNum[3]) === 5 && parseInt(tempNum[0]) === 0 && parseInt(tempNum[1]) === 0 && parseInt(tempNum[2]) === 0) {
		return (parseInt((result * 100).toString()) / 100).toFixed(2);
	} else {
		return (Math.round(num * 100) / 100).toFixed(2);
	}
}

export const getRate = (v: any) => {
	let t: any;
	if (!v || isNaN(v)) {
		t = 0;
	} else {
		t = parseInt(v);
		if ([1, 2, 3].indexOf(t) === -1) t = 0;
	}

	return ['-', '正面', '稳定', '负面'][parseInt(t)];
};

type TableDataFormatOptions = Partial<{
	unit: number;
	fixed: number;
	showFormat: string;
	thousands: boolean;
}>;
/**
 * @description 处理table展示数据
 * @param value 需要处理的数字或者字符串
 * @param unit 转换的单位 比如1亿 就是1e8
 * @param fixed 处理的数字小数点后几位
 * @param showFormat 出现空值展示的状态
 */
export const handleTableDataFormat = (value: any, options?: TableDataFormatOptions): string => {
	const reg = /(\d)(?=(\d{3})+(\.\d*)?$)/g;
	const { unit = 1, fixed = 2, showFormat = '-', thousands } = options || {};
	if (!((value === 0 || value) && typeof Number(value) === 'number' && !isNaN(Number(value)))) return showFormat;
	// 处理极小的数字
	if (Math.abs(value) < 1 / Math.pow(10, fixed)) {
		const v = 0;
		if (thousands) {
			return v.toFixed(fixed).replace(reg, '$1,');
		}
		return v.toFixed(fixed);
	}
	if (unit === 0 || isNaN(Number(unit))) return showFormat;
	const v = (Number(value) / unit)?.toFixed(fixed) || showFormat;
	// eslint-disable-next-line
	if (v == '0') {
		if (thousands) {
			return Math.abs(Number(v)).toString().replace(reg, '$1,');
		}
		return Math.abs(Number(v)).toString();
	}
	if (thousands) {
		return v.replace(reg, '$1,');
	}
	return v;
};
/**
 *
 * 标签颜色转换
 * @param color
 * @return {any}
 */
export const getTagColor = (color: string) => {
	const AppTagColorMap: any = {
		'#febc88': '#FFB169',
		'#92a1f0': '#8CA0FE',
		'#f78182': '#FF7A80',
		'#86C4F7': '#4FC7FF',
	};
	return AppTagColorMap[color] ?? color;
};

/**
 *
 * 获取zlib内容
 * @param contentUrl
 * @return {Promise<unknown>}
 */
export const getZlibContent = (contentUrl: string) => {
	// true 正文 ，false 附件html格式
	return new Promise(function (resolve, reject) {
		let rawFile = new XMLHttpRequest();
		rawFile.open('GET', contentUrl, true);
		rawFile.responseType = 'arraybuffer';
		rawFile.onerror = () => {
			// console.log('get zlib error');
		};
		rawFile.onload = () => {
			try {
				let words = new Uint8Array(rawFile.response);
				// @ts-ignore
				import('text-encoding').then(({ TextDecoder }) => {
					// @ts-ignore
					import('pako/dist/pako_inflate').then((pako) => {
						let content = new TextDecoder('utf-8').decode(pako.inflate(words));
						/* content = content
              .replace(/(\\n\\r)|(\\r\\n)|(\\\\n\\\\r)|(\\\\r\\\\n)/g, '<br />')
              .replace(/(\\n)|(\\\\n)/g, '<br />')
              .replace(/(\\t)|(\\\\t)/g, '')
              .replace(/(FONT-SIZE|FONT-FAMILY|LINE-HEIGHT):/gi, '');*/
						resolve(content);
					});
				});
			} catch (e) {
				// console.log(e, 'decode error');
				reject(e);
			}
		};
		rawFile.send();
	});
};
