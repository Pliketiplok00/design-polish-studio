import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  define: {
    __DEV__: JSON.stringify(mode === "development"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // React Native Web aliases
      "react-native": "react-native-web",
      "react-native-safe-area-context": path.resolve(__dirname, "./src/shims/safe-area-context.tsx"),
      "lucide-react-native": "lucide-react",
      "expo-font": path.resolve(__dirname, "./src/shims/expo-font.ts"),
      "@expo-google-fonts/space-grotesk": path.resolve(__dirname, "./src/shims/google-fonts.ts"),
      "@expo-google-fonts/space-mono": path.resolve(__dirname, "./src/shims/google-fonts.ts"),
      "@react-navigation/native": path.resolve(__dirname, "./src/shims/navigation.tsx"),
      "@react-navigation/native-stack": path.resolve(__dirname, "./src/shims/navigation.tsx"),
    },
    extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".web.js", ".js"],
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".web.js", ".js"],
    },
  },
}));
