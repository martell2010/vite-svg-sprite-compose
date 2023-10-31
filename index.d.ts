import { Config } from 'svgo';

export type InputDirConfig = {
    path: string,
    svgoConfig?: Config;
    enableSvgo?: boolean;
}

export interface PluginConfig {
    inputDirs: InputDirConfig[];
    outputDir: string;
    disabled?: boolean;
    defaultSvgoConfig?: Config;
    spriteName?: `${string}.svg`;
    idPrefix?: string;
}
export declare function ViteSvgSpriteCompose(config: PluginConfig): void;
