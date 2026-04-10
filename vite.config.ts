import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig(({ command }) => ({
  plugins: command === "serve" ? [react(), basicSsl()] : [react()],
  base: "/focus-camera/",
  server: {
    cors: { origin: "*" },
    headers: { "Access-Control-Allow-Origin": "*" },
  },
}));
