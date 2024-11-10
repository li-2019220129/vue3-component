//整合组件，最后导出组件

import { withInstall } from "@lzy/utils/with-install";
import _Virtual from "./src/virtual";

const Virtual = withInstall(_Virtual);
export default Virtual;

declare module "vue" {
  export interface GlobalComponents {
    LzyVirtual: typeof Virtual;
  }
}
