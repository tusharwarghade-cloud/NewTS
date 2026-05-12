import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  integrations: [react()],
  output: "static",
  site: "https://techstalwarts.tushar-warghade.workers.dev",
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    ssr: {
      noExternal: ["@paper-design/shaders-react", "@paper-design/shaders", "cobe"],
    },
    optimizeDeps: {
      include: ["@paper-design/shaders-react", "cobe"],
    },
  },
});
