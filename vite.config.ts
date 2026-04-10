import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import { resolve } from "path";

export default defineConfig(({ command }) => ({
  plugins: command === "serve" ? [basicSsl()] : [],
  base: "/focus/",
  server: {
    cors: { origin: "*" },
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, "background.html"),
      },
    },
  },
}));
