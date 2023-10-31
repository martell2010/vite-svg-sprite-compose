import svgSpriter from 'svg-sprite';
import { optimize } from 'svgo';
import path from 'path';
import fs from 'fs';
import { PluginConfig } from "./types.ts";
import { Plugin } from 'vite';


export default function ViteSvgSpriteCompose(config: PluginConfig): Plugin {
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
                generator(fileName: string) {
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

            // @ts-ignore
            const spriter = svgSpriter(spriteConfig);

            inputDirs.forEach((inputDirConfig) => {

                const {
                    dirPath,
                    svgoConfig,
                    enableSvgo = true,
                } = inputDirConfig;

                const iconFiles = fs.readdirSync(dirPath);

                iconFiles.forEach((fileName) => {
                    const filePath = path.join(dirPath, fileName);
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

            fs.writeFileSync(`${spriteConfig.mode.symbol.dest}/${spriteConfig.mode.symbol.sprite}`, result.symbol.sprite.contents);
        },
    };
}
