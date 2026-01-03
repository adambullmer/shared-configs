import { resolve } from "node:path";

import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      // eslint-disable-next-line ex/no-unhandled
      entry: resolve(__dirname, "src/main.ts"),
      formats: ["es"],
      // SSR mode will change the filename to the entry file name. Must specify in rollup output as well
      fileName: "lint-staged.config",
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: [/^node:/, "lint-staged"],
      output: {
        // SSR mode will change the library filename to the entry file name. Must specify here as well
        entryFileNames: "lint-staged.config.js",
      },
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
    }),
  ],
});
