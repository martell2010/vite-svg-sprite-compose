import { Config } from 'svgo';

export type InputDirConfig = {
    /* Path to directory with svg files*/
    dirPath: string;
    /* SVGO configuration for optimization */
    svgoConfig?: Config;
    /* Skip optimization step */
    enableSvgo?: boolean;
}

export interface PluginConfig {
    /* An array of input directories and their configurations. */
    inputDirs: InputDirConfig[];
    /* The directory where the SVG sprite will be generated */
    outputDir: string;
    /* Set to true to disable the plugin (optional, default is false). */
    disabled?: boolean;
    /* Default SVGO configuration for optimization (optional). */
    defaultSvgoConfig?: Config;
    /* The name of the generated SVG sprite (optional, default is 'sprite.svg'). */
    spriteName?: `${string}.svg`;
    /* An optional prefix to add to SVG IDs. */
    idPrefix?: string;
}
