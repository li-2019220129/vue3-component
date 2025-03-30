import { withInstall } from "@lzy/utils/with-install";
import _FormItem from "./src/form-item.vue";
import _Form from "./src/form.vue";
const FormItem = withInstall(_FormItem);
const Form = withInstall(_Form);
type FormInstance = InstanceType<typeof Form>;

export { FormItem, Form, FormInstance };

export * from "./src/form-item";
export type { FormProps } from "./src/form";

declare module "vue" {
  export interface GlobalComponents {
    LzyFormItem: typeof FormItem;
    LzyForm: typeof Form;
  }
}
