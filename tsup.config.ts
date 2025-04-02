import { defineConfig } from 'tsup'

export default defineConfig({
  minify: true,
  target: 'es2018',
  sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  entry: ['src/index.ts'],
  clean: true,
  external: ['react'],
  banner: {
    js: '"use client";',
  },
})
