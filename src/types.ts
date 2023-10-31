import { Config } from 'svgo';

export type InputDirConfig = {
    dirPath: string,
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
