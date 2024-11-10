import { PropType, ExtractPropTypes } from "vue";

export type Size = "small" | "medium" | "large";
export type ButtonType =
  | "primary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "";
export type NativeType = "button" | "submit" | "reset";
export type Placement = "left" | "right";
export const buttonProps = {
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String as PropType<Size>,
  },
  color: {
    type: String as PropType<string>,
  },
  type: {
    type: String as PropType<ButtonType>,
    validator(value: string) {
      return ["primary", "success", "info", "warning", "danger", ""].includes(
        value
      );
    },
    default: "",
  },
  round: Boolean,
  loading: Boolean,
  nativeType: {
    type: String as PropType<NativeType>,
    default: "button",
  },
  iconPlacement: {
    type: String as PropType<Placement>,
    default: "left",
  },
} as const;
export type ButtonProps = ExtractPropTypes<typeof buttonProps>;

export const buttonEmits = {
  click: (e: MouseEvent) => e instanceof MouseEvent,
  mousedown: (e: MouseEvent) => e instanceof MouseEvent,
};
