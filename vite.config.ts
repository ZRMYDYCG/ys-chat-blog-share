import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import viteCompression from "vite-plugin-compression";
import cdnImport from "vite-plugin-cdn-import";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression({
      verbose: true, 
      disable: false, 
      deleteOriginFile: false, 
      threshold: 10240, 
      algorithm: "gzip", 
      ext: ".gz", 
    }),
    cdnImport({
      modules: [
        {
          name: "moment",
          var: "moment",
          path: "https://cdn.bootcdn.net/ajax/libs/moment.js/2.29.1/moment.min.js",
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/style/style.less";',
      },
    },
  },
});
