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
import ViteSvgSpriteCompose from 'vite-svg-sprite-compose';

export default {
  // ...vite config 
  plugins: [
    ViteSvgSpriteCompose({
      inputDirs: [
        {
          inputDir: 'path/to/your/svg/files',
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
};

```

The above configuration will process your SVG files, optimize them using svgo if enabled, and create an SVG sprite in the specified output directory.

## Configuration Options
* `inputDirs`: An array of input directories and their configurations.
* `outputDir`: The directory where the SVG sprite will be generated.
* `disabled`: Set to true to disable the plugin (optional, default is false).
* `defaultSvgoConfig`: Default svgo configuration for optimization (optional).
* `spriteName`: The name of the generated SVG sprite (optional, default is 'sprite.svg').
* `idPrefix`: An optional prefix to add to SVG IDs.

## License
This project is licensed under the MIT License.

