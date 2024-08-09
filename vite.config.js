import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   host: '0.0.0.0',  // Permitir conexiones desde todas las interfaces de red
  // //  port: 5000,       // Puedes cambiar el puerto si es necesario
  // },
})
