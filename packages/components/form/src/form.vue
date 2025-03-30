<template>
  <form :class="bem.b()">
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { ref, provide } from "vue";
import { createNamespace } from "@lzy/utils/create";
import { FormItemContext } from "./form-item";
import { formProps, formContextKey, FormContext } from "./form";
import { Values } from "async-validator";
const props = defineProps(formProps);
const bem = createNamespace("form");
defineOptions({
  name: "lzy-form",
});

const fileds: FormItemContext[] = [];

const validate = async (
  callback?: (validate: boolean, fileds?: Values) => void
) => {
  let errors: Values = {};
  for (let filed of fileds) {
    try {
      await filed.validate("");
    } catch (err) {
      errors = {
        ...errors,
        ...(err as Values).fields,
      };
    }
  }
  if (Object.keys(errors).length === 0) {
    return callback?.(true);
  } else {
    if (callback) {
      return callback(false, errors);
    }
    return Promise.reject(errors);
  }
};

const addFiled: FormContext["addFiled"] = (content: FormItemContext) => {
  fileds.push(content);
  console.log(fileds);
};

const context = {
  ...props,
  addFiled,
};
provide(formContextKey, context);

defineExpose({
  validate,
});
</script>
