import { PropType, ExtractPropTypes } from "vue";
export const checkboxProps = {
  modelValue: {
    type: [String, Number, Boolean] as PropType<number | string | boolean>,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  indeterminate: {
    type: Boolean,
  },
  label: {
    type: String,
  },
} as const;

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;

export const checkboxEmits = {
  "update:modelValue": (val: number | string | boolean) => typeof val,
  change: (value: boolean) => typeof value,
};
export type CheckboxEmits = typeof checkboxEmits;
