import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      proxy: {
        '/images': {
          target: env.VITE_SUPABASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/images/, '/storage/v1/object/public/blog-images'),
          configure: (proxy, _options) => {
            proxy.on('error', (err, _req, _res) => {
              if (err.message.includes('ECONNRESET')) {
                console.log('[vite] Proxy connection reset from Supabase Storage (Expected behavior - safely ignored)');
              } else {
                console.log('[vite] Proxy Error:', err);
              }
            });
          }
        },
      },
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
