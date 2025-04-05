import { defineConfig } from 'tsup'

export default defineConfig({
  minify: true,
  target: 'es2018',
  sourcemap: false,
  dts: true,
  format: ['esm'],
  entry: ['src/index.ts'],
  clean: true,
  external: ['react', 'react-dom'],
  banner: {
    js: '"use client";',
  },
})
