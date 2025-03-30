import { ExtractPropTypes, InjectionKey, PropType } from "vue";
import type { RuleItem } from "async-validator";

export type Arrayable<T> = T | T[];

export interface FormRules extends RuleItem {
  trigger?: Arrayable<string>;
}
export const formItemValidate = ["success", "error", ""];

export type FormItemValidate = (typeof formItemValidate)[number];

export const formProps = {
  prop: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  rules: [Object, Array] as PropType<Arrayable<FormRules>>,
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const;

export type FormItemProps = Partial<ExtractPropTypes<typeof formProps>>;

export interface FormItemContext extends FormItemProps {
  validate: (trigger:string, callback?: (isValid: boolean) => void) => Promise<void>;
}

export const formItemContextKey: InjectionKey<FormItemContext> = Symbol();
