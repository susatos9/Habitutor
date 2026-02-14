import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	server: {
		port: Number(process.env.PORT || 3000),
	},
	plugins: [
		tsconfigPaths(),
		tailwindcss(),
		tanstackStart(),
		nitro({
			preset: "vercel",
			vercel: {
				functions: {
					runtime: "bun1.x",
				},
			},
			output: {
				dir: "../../.vercel/output",
				publicDir: "../../.vercel/output/static",
			},
		}),
		viteReact(),
	],
	ssr: {
		noExternal: ["@habitutor/api", "@habitutor/auth", "@habitutor/db"],
	},
	optimizeDeps: {
		include: ["@habitutor/api", "@habitutor/auth", "@habitutor/db"],
	},
});
