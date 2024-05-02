import { resolve } from "path";
// eslint-disable-next-line import/namespace
import { defineConfig } from "vite";
import * as fs from "fs";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    outFile: "index.html",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html")
      },
    },
    plugins: [],
  },
  // plugins: [
  //   {
  //     name: "copy-json-to-dist",
  //     writeBundle() {
  //       const destDir = resolve(__dirname, "dist/json");

  //       if (!fs.existsSync(destDir)) {
  //         fs.mkdirSync(destDir, { recursive: true });
  //       }

  //       fs.copyFileSync(
  //         resolve(__dirname, "src/json/tents.json"),
  //         resolve(__dirname, "dist/json/tents.json"),
  //       );
  //     },
  //   },
    // {
    //   name: "copy-images-to-dist",
    //   writeBundle() {
    //     const destDir = resolve(__dirname, "dist/images/tents");

    //     if (!fs.existsSync(destDir)) {
    //       fs.mkdirSync(destDir, { recursive: true });
    //     }

    //     fs.copyFileSync(
    //       resolve(
    //         __dirname,
    //         "src/images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg",
    //       ),
    //       resolve(
    //         __dirname,
    //         "dist/images/tents/cedar-ridge-rimrock-tent-2-person-3-season-in-rust-clay~p~344yj_01~320.jpg",
    //       ),
    //     );
    //     fs.copyFileSync(
    //       resolve(
    //         __dirname,
    //         "src/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
    //       ),
    //       resolve(
    //         __dirname,
    //         "dist/images/tents/marmot-ajax-tent-3-person-3-season-in-pale-pumpkin-terracotta~p~880rr_01~320.jpg",
    //       ),
    //     );
    //     fs.copyFileSync(
    //       resolve(
    //         __dirname,
    //         "src/images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg",
    //       ),
    //       resolve(
    //         __dirname,
    //         "dist/images/tents/the-north-face-alpine-guide-tent-3-person-4-season-in-canary-yellow-high-rise-grey~p~985pr_01~320.jpg",
    //       ),
    //     );
    //     fs.copyFileSync(
    //       resolve(
    //         __dirname,
    //         "src/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
    //       ),
    //       resolve(
    //         __dirname,
    //         "dist/images/tents/the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg",
    //       ),
    //     );
    //   },
    // }
  // ],
});
