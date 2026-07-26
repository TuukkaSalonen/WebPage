import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	root: 'public',
	publicDir: false,
	build: {
		outDir: '../build',
	},
	server: {
		host: '0.0.0.0',
		port: Number(process.env.FRONTEND_PORT_DEV) || 3000,
		fs: {
			allow: ['..'],
		},
		proxy: {
			'/api': {
				target: 'http://backend:5000',
				changeOrigin: true,
				secure: false,
			},
		},
	},
	preview: {
		host: '0.0.0.0',
		port: Number(process.env.FRONTEND_PORT) || 3080,
	},
});
