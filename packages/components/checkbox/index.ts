//整合组件，最后导出组件

import { withInstall } from "@lzy/utils/with-install";
import _Checkbox from "./src/checkbox.vue";

const Checkbox = withInstall(_Checkbox);
export default Checkbox;

export * from "./src/checkbox";

declare module "vue" {
  export interface GlobalComponents {
    LzyCheckbox: typeof Checkbox;
  }
}
