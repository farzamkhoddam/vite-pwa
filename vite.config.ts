import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        icons: [
          {
            src: "icons/vite-logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#121212",
      },
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
        type: "module",
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.startsWith("/");
            },
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
