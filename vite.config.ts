import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      exclude: ['**/*.test.ts', '**/*.spec.ts', '**/*.test.tsx'],
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@core': resolve(__dirname, 'src/core'),
      '@shared': resolve(__dirname, 'src/shared'),
      '@features': resolve(__dirname, 'src/features'),
    },
  },
  build: {
    lib: {
      // 主入口
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        // 各 Feature 子路径导出
        auth: resolve(__dirname, 'src/features/auth/index.ts'),
        user: resolve(__dirname, 'src/features/user/index.ts'),
        permission: resolve(__dirname, 'src/features/permission/index.ts'),
        tenant: resolve(__dirname, 'src/features/tenant/index.ts'),
        'feature-flag': resolve(__dirname, 'src/features/feature-flag/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'es' : 'cjs'}.js`,
    },
    rollupOptions: {
      // React 作为 peerDependency，不打进 bundle
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        // 确保每个 Feature 的 CSS（如果有）被正确处理
        assetFileNames: 'assets/[name][extname]',
      },
    },
    // 生成 sourcemap 便于调试
    sourcemap: true,
    // 清空 dist
    emptyOutDir: true,
  },
});
