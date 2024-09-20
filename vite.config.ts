import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig(async () => {
  const UnoCss = await import("unocss/vite").then((i) => i.default);

  return {
    plugins: [
      uni(),

      // https://github.com/unocss/unocss
      UnoCss(),
    ],
  };
});
