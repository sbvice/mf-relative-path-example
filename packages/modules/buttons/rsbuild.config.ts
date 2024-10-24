import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

// Static asset server is running on route /module

const ModuleName = 'buttons';
const StaticAssetRoute = '/module';
const PublicPath = `${StaticAssetRoute}/${ModuleName}`;

export default defineConfig({
  output: {
    assetPrefix: PublicPath,
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
			name: ModuleName,
			exposes: {
				'./ConfettiButton': './src/confetti-button',
			},
			shared: ['react', 'react-dom'],
		}),
  ],
});
