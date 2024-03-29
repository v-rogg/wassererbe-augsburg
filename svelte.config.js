import adapter from "@sveltejs/adapter-cloudflare";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "body",
  },

  // onwarn: (warning, handler) => {
  // 	const { code, frame } = warning;
  // 	if (code === 'css-unused-selector') return;
  //
  // 	handler(warning);
  // }
};

export default config;
