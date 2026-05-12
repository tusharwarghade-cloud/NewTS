import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":   ["react", "react-dom"],
          "vendor-motion":  ["framer-motion"],
          "vendor-three":   ["three", "@react-three/fiber", "@react-three/drei"],
          "vendor-ui":      ["lucide-react"],
        },
      },
    },
  },
});
