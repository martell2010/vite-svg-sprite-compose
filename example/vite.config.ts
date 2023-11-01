import { defineConfig } from 'vite';
import ViteSvgSpriteCompose from 'vite-svg-sprite-compose';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        ViteSvgSpriteCompose({
            input: [
                {
                    dir: resolve(process.cwd(), 'src/assets/svg'),
                    svgoConfig: {
                        // Add your svgo configuration here (optional).
                    },
                    enableSvgo: true, // Set to `false` to disable svgo optimization (optional).
                },
                // Add more input directories if needed.
            ],
            output: {
                dir: resolve(process.cwd(), 'public/'),
                spriteName: 'sprite.svg', // Set the output sprite file name (optional).
                makeIdsArray: true,
            },
            disabled: false, // Set to `true` to disable the plugin (optional).
            defaultSvgoConfig: {
                // Add your default svgo configuration here (optional).
            },
            idPrefix: '', // Add an optional prefix to the SVG IDs (optional).
        }),
    ],
})
