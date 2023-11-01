# Vite-svg-sprite-compose

![npm](https://img.shields.io/npm/v/vite-svg-sprite-compose)
![npm](https://img.shields.io/npm/dt/vite-svg-sprite-compose)

ViteSvgSpriteCompose is a Vite plugin that enables you to easily generate SVG sprite sheets using [svg-sprite](https://github.com/jkphl/svg-sprite) and optionally optimize the SVG files with [svgo](https://github.com/svg/svgo).

## Installation

You can install ViteSvgSpritePlugin via npm or yarn:

```bash
npm install vite-svg-sprite-compose --save-dev
# or
yarn add vite-svg-sprite-compose --dev
```

## Usage
To use ViteSvgSpritePlugin, add it to your Vite config file (vite.config.js). Here's an example of how to set up the plugin:

```javascript
import { defineConfig } from 'vite';
import ViteSvgSpriteCompose from 'vite-svg-sprite-compose';

export default defineConfig({
    plugins: [
        ViteSvgSpriteCompose({
            inputDirs: [
                {
                    dirPath: 'path/to/your/svg/files',
                    svgoConfig: {
                        // Add your svgo configuration here (optional).
                    },
                    enableSvgo: true, // Set to `false` to disable svgo optimization (optional).
                },
                // Add more input directories if needed.
            ],
            outputDir: 'path/to/output/directory',
            disabled: false, // Set to `true` to disable the plugin (optional).
            defaultSvgoConfig: {
                // Add your default svgo configuration here (optional).
            },
            spriteName: 'sprite.svg', // Set the output sprite file name (optional).
            idPrefix: '', // Add an optional prefix to the SVG IDs (optional).
        }),
    ],
})

```

The above configuration will process your SVG files, optimize them using svgo if enabled, and create an SVG sprite in the specified output directory.

## Configuration Options

```typescript
import { Config } from 'svgo';

type InputConfig = {
    /* Path to directory with svg files */
    dir: string;
    /* SVGO configuration for optimization */
    svgoConfig?: Config;
    /* Skip optimization step */
    enableSvgo?: boolean;
}

type OutputConfig = {
    /* The directory where the SVG sprite will be generated */
    dir: string;
    /* The name of the generated SVG sprite (optional, default is 'sprite.svg'). */
    spriteName?: `${string}.svg`;
    /* Creating json file with svg IDs (optional, default is false). */
    makeIdsArray?: boolean;
    /* File name for json of svg IDs (optional, default is 'sprite-ids.json') */
    idsArrayName?: `${string}.json`;
}

interface PluginConfig {
    /* An array of input directories and their configurations. */
    input: InputConfig[];
    /* The directory where the SVG sprite will be generated */
    output: OutputConfig;
    /* Set to true to disable the plugin (optional, default is false). */
    disabled?: boolean;
    /* Default SVGO configuration for optimization (optional). */
    defaultSvgoConfig?: Config;
    /* An optional prefix to add to SVG IDs. */
    idPrefix?: string;
}

```

## License
This project is licensed under the MIT License.

