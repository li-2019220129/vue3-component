/*
 * @Author: lzy 3312202467@qq.com
 * @Date: 2024-11-17 14:33:19
 * @LastEditors: lzy 3312202467@qq.com
 * @LastEditTime: 2024-11-24 17:48:52
 * @FilePath: \vue3-component\packages\components\form\src\form.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ExtractPropTypes, PropType, InjectionKey } from "vue";
import type { RuleItem } from "async-validator";
import { FormItemContext } from "./form-item";

export type Arrayable<T> = T | T[];
export interface FormRules extends RuleItem {
  trigger: Arrayable<string>;
}
export const formItemValidate = ["success", "error", ""];

export type FormItemValidate = (typeof formItemValidate)[number];

export const formProps = {
  model: {
    type: Object as PropType<Record<string, any>>,
    default: () => {
      return {};
    },
  },
  rules: Object as PropType<Record<string, Arrayable<FormRules>>>,
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const;

export type FormProps = ExtractPropTypes<typeof formProps>;

export interface FormContext extends FormProps {
  addFiled: (field: FormItemContext) => void;
}

export const formContextKey: InjectionKey<FormContext> = Symbol();
