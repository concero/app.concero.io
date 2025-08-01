import { defineConfig, loadEnv } from 'vite'
import stylelint from 'vite-plugin-stylelint'
import react from '@vitejs/plugin-react-swc'
import precss from 'precss'
import EnvironmentPlugin from 'vite-plugin-environment'
import svgr from 'vite-plugin-svgr'
import tsconfigPaths from 'vite-tsconfig-paths'

const convertColorsToCurrentColorPlugin = {
	name: 'convertColorsToCurrentColor',
	description: 'Convert all fill and stroke colors to currentColor for monochrome SVGs.',
	fn: (_, __, { path }) => {
		return {
			element: {
				enter: (node, parentNode) => {
					const filePath = path

					if (filePath && filePath.includes('/monochrome/')) {
						if (node.attributes.fill && node.attributes.fill !== 'none') {
							node.attributes.fill = 'currentColor'
						}

						if (node.attributes.stroke && node.attributes.stroke !== 'none') {
							node.attributes.stroke = 'currentColor'
						}
					}
				},
			},
		}
	},
}
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd())
	return {
		plugins: [
			react(),
			tsconfigPaths(),
			stylelint({
				fix: true,
				include: ['./src/**/*.css', './src/**/*.pcss'],
				configFile: './.stylelintrc.json',
				emitErrorAsWarning: true,
			}),
			EnvironmentPlugin('all'),
			svgr({
				svgrOptions: {
					plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
					svgo: true,
					svgoConfig: {
						path: 'monochrome',
						plugins: [
							//@ts-ignore
							convertColorsToCurrentColorPlugin,
						],
						floatPrecision: 4,
					},
				},
			}),
		],
		css: {
			postcss: {
				plugins: [precss()],
			},
		},
		define: {
			// __IS_DEV__:  mode === 'development',
			// TODO: Remove after release
			__IS_DEV__: true,
		},
		build: {
			outDir: './dist',
			emptyOutDir: true,
		},
	}
})
