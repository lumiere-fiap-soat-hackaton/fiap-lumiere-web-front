import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react(), tsconfigPaths()],
    css: {
      modules: {
        scopeBehaviour: 'local',
        generateScopedName: '[name]__[local]___[hash:base64:5]',
      },
    },
    server: {
      proxy: {
        '/server': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/server/, ''),
          configure: (proxy) => {
            proxy.on('error', (err, req) => {
              console.log('\n🔴 PROXY ERROR');
              console.log('━'.repeat(50));
              console.log(`Time: ${new Date().toISOString()}`);
              console.log(`URL: ${req?.url || 'N/A'}`);
              console.log(`Method: ${req?.method || 'N/A'}`);
              console.log(`Error: ${err.message}`);
              console.log('━'.repeat(50));
            });
            proxy.on('proxyReq', (proxyReq, req) => {
              console.log('\n🟡 OUTGOING REQUEST');
              console.log('━'.repeat(50));
              console.log(`Time: ${new Date().toISOString()}`);
              console.log(`Method: ${req.method}`);
              console.log(`Original URL: ${req.url}`);
              console.log(`Target: ${env.VITE_API_BASE_URL}${proxyReq.path}`);
              console.log(`Headers: ${JSON.stringify(proxyReq.getHeaders(), null, 2)}`);
              console.log('━'.repeat(50));
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              const statusColor = proxyRes?.statusCode && proxyRes?.statusCode >= 400 ? '🔴' :
                proxyRes.statusCode && proxyRes?.statusCode >= 300 ? '🟠' : '🟢';

              console.log(`\n${statusColor} INCOMING RESPONSE`);
              console.log('━'.repeat(50));
              console.log(`Time: ${new Date().toISOString()}`);
              console.log(`Status: ${proxyRes.statusCode} ${proxyRes.statusMessage}`);
              console.log(`Method: ${req.method}`);
              console.log(`URL: ${req.url}`);
              console.log(`Content-Type: ${proxyRes.headers['content-type'] || 'N/A'}`);
              console.log(`Content-Length: ${proxyRes.headers['content-length'] || 'N/A'}`);
              console.log(`Response Time: ${Date.now() - (req.startTime || Date.now())}ms`);
              console.log('━'.repeat(50));
            });
          },
        },
      },
    },
  };
});

