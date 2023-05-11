import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import { defineConfig, loadEnv, ConfigEnv } from 'vite';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import { createProxy, wrapperEnv } from './build/proxy';

const pathResolve = (dir: string) => {
	return resolve(__dirname, '.', dir);
};

const viteConfig = defineConfig((mode: ConfigEnv) => {
	const env = loadEnv(mode.mode, process.cwd());
	const viteEnv = wrapperEnv(env);
	const { VITE_PORT, VITE_PROXY, VITE_PUBLIC_PATH, VITE_OPEN } = viteEnv;
	return {
		plugins: [vue(), vueSetupExtend()],
		root: process.cwd(),
		resolve: {
			alias: {
				'/@': pathResolve('./src/'),
				'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
			},
			// 如果你在你的应用程序中有相同依赖的副本（比如 monorepos），请使用此选项强制 Vite 始终将列出的依赖项解析为同一副本（从项目根目录）。
			dedupe: ['vue'],
			// 导入时想要省略的扩展名列表。注意:不建议忽略自定义导入类型的扩展名（例如：.vue），因为它会影响 IDE 和类型支持。
			extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
		},
		base: mode.command === 'serve' ? './' : VITE_PUBLIC_PATH,
		optimizeDeps: {
			include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en', 'element-plus/lib/locale/lang/zh-tw'],
		},
		server: {
			host: true,
			port: VITE_PORT,
			open: Boolean(VITE_OPEN),
			hmr: true,
			// cors: true, //为开发服务器配置 CORS , 默认启用并允许任何，后端要配置cors前端设置才有用
			// https: true, //是否启用 http 2
			proxy: createProxy(VITE_PROXY),
		},
		build: {
			outDir: 'dist',
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					entryFileNames: `assets/[name].[hash].js`,
					chunkFileNames: `assets/[name].[hash].js`,
					assetFileNames: `assets/[name].[hash].[ext]`,
					compact: true,
					manualChunks: {
						vue: ['vue', 'vue-router', 'pinia'],
						echarts: ['echarts'],
					},
				},
			},
		},
		css: { preprocessorOptions: { css: { charset: false } } },
		define: {
			__VUE_I18N_LEGACY_API__: JSON.stringify(false),
			__VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
			__INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
			__VERSION__: JSON.stringify(process.env.npm_package_version),
		},
	};
});

export default viteConfig;
