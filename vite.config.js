import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    resolve: {
      alias: {
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
        "@emotion/react": path.resolve(
          __dirname,
          "node_modules/@emotion/react",
        ),
        "@emotion/styled": path.resolve(
          __dirname,
          "node_modules/@emotion/styled",
        ),
      },
    },
    server: {
      host: true,
      port: parseInt(env.VITE_PORT || env.PORT || "5175", 10),
      allowedHosts: [
        "mentor-4be.ptascloud.online",
        "localhost",
        // ✅ Add the Mentor-specific Onrender host here
        "careersync-mentor-frontend.onrender.com",
      ],
      hmr: {
        clientPort:
          mode === "production"
            ? 443
            : parseInt(env.VITE_PORT || env.PORT || "5175", 10),
      },
    },
  };
});
