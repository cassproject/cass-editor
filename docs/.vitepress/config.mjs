import {defineConfig} from 'vitepress';
import {fileURLToPath, URL} from 'node:url';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);
const {description} = require('../../package.json');

export default defineConfig({
    title: 'CaSS Docs',
    description,
    base: process.env.DOCS_BASE || '/docs/',
    // Same packaging contract as the old VuePress config (dest: 'public/docs'):
    // build into public/ so a subsequent `vite build` copies docs into dist/docs.
    outDir: '../public/docs',
    // The docs predate the VitePress migration and contain links to pages
    // that were never written; don't fail the build over them.
    ignoreDeadLinks: true,
    // VuePress treated README.md as the directory index; VitePress expects
    // index.md. Rewrite so directory URLs (docs/authoring/foo/) keep working.
    rewrites: {
        'README.md': 'index.md',
        ':path(.*)/README.md': ':path(.*)/index.md'
    },
    head: [
        ['meta', {name: 'theme-color', content: '#3eaf7c'}]
    ],
    themeConfig: {
        logo: '/cass-logo.png',
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Getting Started', link: '/guide/introduction/'}
        ]
    },
    vite: {
        // Static assets still live in the legacy VuePress location.
        publicDir: fileURLToPath(new URL('../.vuepress/public', import.meta.url)),
        resolve: {
            alias: [
                // Legacy VuePress image alias used throughout the markdown:
                // ![...](~@img/foo.png)
                {
                    find: /^(?:\.\/)?~@img\//,
                    replacement: fileURLToPath(new URL('../.vuepress/public/img', import.meta.url)) + '/'
                }
            ]
        }
    }
});
