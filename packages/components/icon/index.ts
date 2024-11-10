//整合组件，最后导出组件

import { withInstall } from "@lzy/utils/with-install";
import _Icon from "./src/icon.vue";

const Icon = withInstall(_Icon);
export default Icon;

export * from "./src/icon";

declare module "vue" {
  export interface GlobalComponents {
    LzyIcon: typeof Icon;
  }
}
