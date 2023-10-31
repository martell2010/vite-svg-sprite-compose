import svgSpriter from 'svg-sprite';
import { optimize } from 'svgo';
import path from 'path';
import fs from 'fs';

export default function ViteSvgSpriteCompose(config) {
    const {
        inputDirs,
        outputDir,
        disabled = false,
        defaultSvgoConfig,
        spriteName = 'sprite.svg',
        idPrefix = '',
    } = config;

    const spriteConfig = {
        shape: {
            id: {
                separator: '',
                generator(fileName) {
                    const id = fileName.replace(/\.svg$/, '');
                    return `${idPrefix}${id}`;
                },
            },
        },
        mode: {
            symbol: {
                dest: outputDir,
                sprite: spriteName,
            },
        },
    };

    return {
        name: 'vite-svg-sprite-compose',

        async buildStart() {
            if (disabled) {
                return;
            }

            const spriter = svgSpriter(spriteConfig);

            inputDirs.forEach((inputDirConfig) => {

                const {
                    inputDir,
                    svgoConfig,
                    enableSvgo = true,
                } = inputDirConfig;

                const iconFiles = fs.readdirSync(inputDir);

                iconFiles.forEach((fileName) => {
                    const filePath = path.join(inputDir, fileName);
                    const fileContent = fs.readFileSync(filePath, 'utf-8');

                    if (enableSvgo) {
                        const r = optimize(fileContent, svgoConfig ?? defaultSvgoConfig);
                        spriter.add(fileName, '', r.data);
                    } else {
                        spriter.add(fileName, '', fileContent);
                    }

                });
            });

            const { result } = await spriter.compileAsync();

            await fs.writeFileSync(`${spriteConfig.mode.symbol.dest}/${spriteConfig.mode.symbol.sprite}`, result.symbol.sprite.contents);

        },
    };
}
