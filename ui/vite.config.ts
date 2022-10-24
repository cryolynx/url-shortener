import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = {
    ...process.env,
    ...loadEnv(mode, process.cwd()),
  }

  return defineConfig({
    plugins: [react(), eslint()],
    server: {
      port: Number(process.env.VITE_PORT),
      proxy: {
        '/api': {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}
