import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE');
  console.log({ mode, env });
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env': env
    }
  };
});
