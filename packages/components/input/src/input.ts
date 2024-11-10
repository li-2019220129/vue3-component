import { PropType, ExtractPropTypes } from "vue";

export const inputProps = {
  type: {
    type: String as PropType<string>,
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
    type: String as PropType<string>,
    default: "",
  },
};


export const inputEmits = {
  focus:(e:FocusEvent)=> typeof e,
  blur:(e:FocusEvent)=> typeof e,
  input:(value:string)=> typeof value,
}

export type InputProps = ExtractPropTypes<typeof inputProps>;
