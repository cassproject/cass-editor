import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
    const env = { ...process.env };
    return {
        define: {
            // cassproject depends on some globals
            global: 'window',
            'process.env': env
        },
        base: '',
        plugins: [vue(),
        nodePolyfills({
            include: ["buffer", "path", "process", "url", "util"],
            globals: {
                Buffer: true,
                path: true,
                process: true,
                url: true,
                util: true
            }
        })
        ],
        css: {
            preprocessorOptions: {
                scss: {
                    // Allow SCSS to find variables etc.
                    api: 'modern-compiler'
                }
            }
        },
        build: {
            minify: true
        },
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: fileURLToPath(new URL('./src', import.meta.url))
                }
            ]
        },
        server: {
            port: 8082
        },
    }
});
