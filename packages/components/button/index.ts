import { withInstall } from "@lzy/utils/with-install";
import _Button from "./src/button.vue";
const Button = withInstall(_Button);

export default Button;

export * from "./src/button";

declare module "vue" {
  export interface GlobalComponents {
    LzyButton: typeof Button;
  }
}
