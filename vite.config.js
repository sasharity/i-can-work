// import { defineConfig } from "vite";

// export default defineConfig({
//     server: {
//         open: true,
//     },
// });


import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "src/",
    

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        jobs: resolve(__dirname, "src/pages/jobs.html"),
        post_jobs: resolve(__dirname, "src/pages/post_jobs.html"),
        users_directory: resolve(__dirname, "src/pages/users_directory.html"),
        join: resolve(__dirname, "src/pages/join.html"),
      },
    },
  },
});