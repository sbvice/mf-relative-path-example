import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
	server: {
		port: 3000,
		proxy: [{
			context: '/module',
			target: 'http://localhost:3001', // module-server URL
		}]
	},
	plugins: [
		pluginReact(),
		pluginModuleFederation({
			name: 'host',
			remotes: {
				'buttons': 'buttons@/module/buttons/mf-manifest.json'
			},
			shared: ['react', 'react-dom'],
			dts: {
				consumeTypes: {
					remoteBasePath: 'http://localhost:3001/module',
				}
			}
		}),
	],
});