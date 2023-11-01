import SVGSprite from 'svg-sprite';
import { optimize } from 'svgo';
import path from 'path';
import fs from 'fs';
import { PluginConfig } from "./types.ts";
import { Plugin } from 'vite';


export default function ViteSvgSpriteCompose(config: PluginConfig): Plugin {
    const {
        input,
        output,
        disabled = false,
        defaultSvgoConfig= {},
        idPrefix = '',
    } = config;

    const {
        dir: outputDir,
        spriteName = 'sprite.svg',
        makeIdsArray = false,
        idsArrayName='sprite-ids.json'
    } = output

    const ids: string[] = [];

    const spriteConfig = {
        shape: {
            id: {
                generator(fileName: string) {
                    const id = fileName.replace(/\.svg$/, '');
                    const name =  `${idPrefix}${id}`;

                    if (makeIdsArray) {
                        ids.push(name);
                    }

                    return name;
                },
            },
        },
        mode: {
            symbol: {
                dest: outputDir,
                sprite: spriteName,
            },
        },
        svg: {
            xmlDeclaration: false,
        },
    };

    return {
        name: 'vite-svg-sprite-compose',

        async buildStart() {
            if (disabled) {
                return;
            }

            // @ts-ignore
            const spriter = new SVGSprite(spriteConfig);

            input.forEach((inputDirConfig) => {

                const {
                    dir,
                    svgoConfig,
                    enableSvgo = true,
                } = inputDirConfig;

                const iconFiles = fs.readdirSync(dir);

                iconFiles.forEach((fileName) => {
                    const filePath = path.join(dir, fileName);
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

            fs.writeFileSync(`${outputDir}/${spriteName}`, result.symbol.sprite.contents);

            if (makeIdsArray){
                fs.writeFileSync(`${outputDir}/${idsArrayName}`, JSON.stringify(ids));
            }
        },
    };
}
