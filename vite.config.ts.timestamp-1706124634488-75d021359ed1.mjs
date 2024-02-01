// vite.config.ts
import { defineConfig } from "file:///Users/user/Documents/GitHub/frontend/node_modules/vite/dist/node/index.js";
import stylelint from "file:///Users/user/Documents/GitHub/frontend/node_modules/vite-plugin-stylelint/dist/index.mjs";
import react from "file:///Users/user/Documents/GitHub/frontend/node_modules/@vitejs/plugin-react-swc/index.mjs";
import precss from "file:///Users/user/Documents/GitHub/frontend/node_modules/precss/index.js";
import EnvironmentPlugin from "file:///Users/user/Documents/GitHub/frontend/node_modules/vite-plugin-environment/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    stylelint({
      fix: true,
      include: ["./src/**/*.css", "./src/**/*.pcss"],
      configFile: "./.stylelintrc.json",
      emitErrorAsWarning: true
    }),
    EnvironmentPlugin("all")
  ],
  css: {
    postcss: {
      plugins: [precss()]
    }
  },
  build: {
    outDir: "./dist",
    emptyOutDir: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvdXNlci9Eb2N1bWVudHMvR2l0SHViL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvdXNlci9Eb2N1bWVudHMvR2l0SHViL2Zyb250ZW5kL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy91c2VyL0RvY3VtZW50cy9HaXRIdWIvZnJvbnRlbmQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHN0eWxlbGludCBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZWxpbnQnXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djJ1xuaW1wb3J0IHByZWNzcyBmcm9tICdwcmVjc3MnXG5pbXBvcnQgRW52aXJvbm1lbnRQbHVnaW4gZnJvbSAndml0ZS1wbHVnaW4tZW52aXJvbm1lbnQnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHN0eWxlbGludCh7XG4gICAgICBmaXg6IHRydWUsXG4gICAgICBpbmNsdWRlOiBbJy4vc3JjLyoqLyouY3NzJywgJy4vc3JjLyoqLyoucGNzcyddLFxuICAgICAgY29uZmlnRmlsZTogJy4vLnN0eWxlbGludHJjLmpzb24nLFxuICAgICAgZW1pdEVycm9yQXNXYXJuaW5nOiB0cnVlLFxuICAgIH0pLFxuICAgIEVudmlyb25tZW50UGx1Z2luKCdhbGwnKSxcbiAgXSxcbiAgY3NzOiB7XG4gICAgcG9zdGNzczoge1xuICAgICAgcGx1Z2luczogW3ByZWNzcygpXSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIG91dERpcjogJy4vZGlzdCcsXG4gICAgZW1wdHlPdXREaXI6IHRydWUsXG4gIH0sXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpUyxTQUFTLG9CQUFvQjtBQUM5VCxPQUFPLGVBQWU7QUFDdEIsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUNuQixPQUFPLHVCQUF1QjtBQUU5QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixVQUFVO0FBQUEsTUFDUixLQUFLO0FBQUEsTUFDTCxTQUFTLENBQUMsa0JBQWtCLGlCQUFpQjtBQUFBLE1BQzdDLFlBQVk7QUFBQSxNQUNaLG9CQUFvQjtBQUFBLElBQ3RCLENBQUM7QUFBQSxJQUNELGtCQUFrQixLQUFLO0FBQUEsRUFDekI7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILFNBQVM7QUFBQSxNQUNQLFNBQVMsQ0FBQyxPQUFPLENBQUM7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxFQUNmO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
