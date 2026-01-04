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
    },
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      external: [/^node:/, "semantic-release"],
    },
  },
  plugins: [dts()],
});
