import { Config } from 'svgo';

export type InputConfig = {
    /* Path to directory with svg files */
    dir: string;
    /* SVGO configuration for optimization */
    svgoConfig?: Config;
    /* Skip optimization step */
    enableSvgo?: boolean;
}

export type OutputConfig = {
    /* The directory where the SVG sprite will be generated */
    dir: string;
    /* The name of the generated SVG sprite (optional, default is 'sprite.svg'). */
    spriteName?: `${string}.svg`;
    /* Creating json file with svg IDs (optional, default is false). */
    makeIdsArray?: boolean;
    /* File name for json of svg IDs (optional, default is 'sprite-ids.json') */
    idsArrayName?: `${string}.json`;
}

export interface PluginConfig {
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
