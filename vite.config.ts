// import { fileURLToPath, URL } from "url";
import { resolve } from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     "@": fileURLToPath(new URL("./lib", import.meta.url)),
  //   },
  // },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "lib/index.ts"),
      name: "Vue3Notifications",
      // the proper extensions will be added
      fileName: "vue3-notifications",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled into your library
      external: ["vue"],
      output: {
        // Provide global variables to use in the UMD build for externalized deps
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
