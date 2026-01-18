import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      // 1. autoUpdate: App updates immediately when you deploy changes
      registerType: "autoUpdate",

      // 2. Caching Strategy: Caches standard files + larger assets
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB limit
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"], // Cache these file types
      },

      // 3. Assets to include in the PWA cache
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],

      // 4. The Manifest (This makes it installable)
      manifest: {
        name: "Chicora - Laundry & Dry Clean",
        short_name: "Chicora",
        description:
          "Premium laundry and dry cleaning services at your doorstep.",

        // Theme Colors (Matches your Blue/White App Theme)
        theme_color: "#2563EB", // Blue-600 (Your Navbar color)
        background_color: "#F3F4F6", // Gray-100 (Your App background)

        display: "standalone", // Looks like a native app (no browser bar)
        orientation: "portrait", // Laundry apps usually work best in portrait

        // Icons configuration (Ensure these exist in public/icons folder)
        icons: [
          {
            src: "/src/favicon_io/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/src/favicon_io/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/src/favicon_io/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // Required for Android adaptive icons
          },
        ],
      },
    }),
  ],
  // 5. Production Optimization (Removes console logs in production)
  esbuild: {
    drop: ["console", "debugger"],
  },
});
