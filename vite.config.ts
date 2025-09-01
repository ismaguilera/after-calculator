import { defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: 'https://ismaguilera.github.io/after-calculator/', // Link page
})
