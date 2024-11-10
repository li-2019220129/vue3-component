import type { App, Plugin } from "vue";
export type SFCWithInstall<T> = T & Plugin;

export function withInstall<T>(com: T) {
  (com as SFCWithInstall<T>).install = (app: App): void => {
    const { name } = com as unknown as { name: string };
    app.component(name, com as SFCWithInstall<T>);
  };
  return com as SFCWithInstall<T>;
}
