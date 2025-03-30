import { PropType, ExtractPropTypes } from "vue";

export const inputProps = {
  type: {
    type: String,
  },
  modelValue: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  showPassword: {
    type: Boolean,
    default: false,
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: String,
    default: "",
  },
};

export const inputEmits = {
  focus: (e: FocusEvent) => typeof e,
  blur: (e: FocusEvent) => typeof e,
  input: (value: string) => typeof value,
  change: (value: string) => typeof value,
};

export type InputProps = ExtractPropTypes<typeof inputProps>;
