import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import {fileURLToPath, URL} from 'node:url';
import {nodePolyfills} from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
    const env = {...process.env};
    return {
        define: {
            'process.env': env
        },
        base: '/',
        plugins: [vue(),
            nodePolyfills({
                include: ["buffer","path","process"],
                globals: {
                    Buffer: true,
                    path: true,
                    process: true
                }
            })
        ],
        build: {
            minify: false
        },
        resolve: {
            alias: [
                {
                    find: '@',
                    replacement: fileURLToPath(new URL('./src', import.meta.url))
                }
            ]
        }
    };
});
