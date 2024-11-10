//整合组件，最后导出组件

import { withInstall } from "@lzy/utils/with-install";
import _Tree from "./src/tree.vue";

const Tree = withInstall(_Tree);
export default Tree;

export * from "./src/tree";

declare module "vue" {
  export interface GlobalComponents {
    LzyTree: typeof Tree;
  }
}
