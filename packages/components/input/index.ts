import { withInstall } from "@lzy/utils/with-install";
import _Input from "./src/input.vue";

const Input = withInstall(_Input);

export default Input;

export * from "./src/input";

declare module "vue" {
  export interface GlobalComponents {
    LzyInput: typeof Input;
  }
}
