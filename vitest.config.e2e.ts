 import { defineConfig } from 'vitest/config'
 
 export default defineConfig({
   test: {
     include: ['**/*.e2e-spec.ts'],
     globals: true,
     root: './',
     setupFiles: ['./test/setup-e2e/setup-e2e.ts']
   },
 })