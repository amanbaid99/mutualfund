import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site is served from https://<user>.github.io/<repo>/
// so assets must be requested from that sub-path. Set BASE_PATH="/" in the
// workflow when moving to a custom domain or a <user>.github.io repo.
const base = process.env.BASE_PATH ?? '/mutualfund/'

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
