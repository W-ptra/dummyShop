import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 7000,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: `http://192.168.0.101:8080`,
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
