import { generateSprite, PluginConfig } from "svg-sprite-compose-cli";
import { Plugin, ResolvedConfig, ViteDevServer } from "vite";
import { resolve } from "path";

export default function ViteSvgSpriteCompose(config: PluginConfig): Plugin[] {
  let viteConfig: ResolvedConfig = {} as ResolvedConfig;
  const getConsoleMsg = (msg: string) => `[vite-svg-sprite-compose]: ${msg}`;
  const getFullPath = (path: string): string => resolve(process.cwd(), path);

  let debounceTimer: any = null;
  const debounce = (callback: Function) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(callback, 200);
  };

  const successGeneration = () =>
    viteConfig.logger.info(getConsoleMsg("Generation sprite success"));
  const errorGeneration = (err: any) =>
    viteConfig.logger.info(
      getConsoleMsg(`Sprite error: ${JSON.stringify(err)}`),
    );

  return [
    {
      name: "vite-svg-sprite-compose:build",
      apply: "build",
      configResolved(_config) {
        viteConfig = _config;
      },
      enforce: "pre",
      buildStart: () => {
        generateSprite(config).then(successGeneration).catch(errorGeneration);
      },
    },
    {
      name: "vite-svg-sprite-compose:serve",
      apply: "serve",
      enforce: "pre",
      configResolved(_config) {
        viteConfig = _config;
      },
      buildStart: () => {
        generateSprite(config).then(successGeneration).catch(errorGeneration);
      },
      config: () => ({ server: { watch: { disableGlobbing: false } } }),
      configureServer({ watcher, ws }: ViteDevServer) {
        const inputPaths = config.input.map(({ dir }) => getFullPath(dir));

        const reload = (path: string) => {
          if (inputPaths.some((dir: string) => path.includes(dir))) {
            debounce(() => {
              generateSprite(config)
                .then(() => {
                  ws.send({ type: "full-reload", path: "*" });
                  successGeneration();
                })
                .catch(errorGeneration);
            });
          }
        };

        inputPaths.forEach((path) => watcher.add(path));
        watcher.on("add", reload);
        watcher.on("change", reload);
        watcher.on("unlink", reload);
      },
    },
  ];
}

export { defineConfig } from "svg-sprite-compose-cli";
export type { PluginConfig } from "svg-sprite-compose-cli";
