<template>
  <div
    :class="[
      bem.b(),
      bem.is('success', validateState === 'success'),
      bem.is('error', validateState === 'error'),
    ]"
  >
    <label :class="bem.e('label')">
      <slot name="label">
        {{ label }}
      </slot>
    </label>
    <div :class="bem.e('content')">
      <slot></slot>
      <div :class="bem.e('error')">
        <slot name="error">
          {{ validateMessage }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createNamespace } from "@lzy/utils/create";
import {
  FormItemValidate,
  formProps,
  formItemContextKey,
  FormItemContext,
  FormRules,
  Arrayable,
} from "./form-item";
import { formContextKey } from "./form";
import AsyncValidator from "async-validator";
import { ref, provide, reactive, computed, inject,onMounted } from "vue";
const bem = createNamespace("form-item");
const props = defineProps(formProps);
const injectData = inject(formContextKey);
console.log(injectData, "injectData");
defineOptions({
  name: "lzy-form-item",
});

const converArray = (rules: Arrayable<FormRules> | undefined) => {
  return rules ? (Array.isArray(rules) ? rules : [rules]) : [];
};

const _rules = computed(() => {
  const rules: FormRules[] = converArray(props.rules);
  const formRules: FormRules[] = converArray(injectData?.rules?.[props.prop]);
  return [...rules, ...formRules];
});

const getRuleFiltered = (trigger: string) => {
  const rules = _rules.value;

  return rules.filter((rule) => {
    if (!rule.trigger || !trigger) return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger);
    } else {
      return rule.trigger === trigger;
    }
  });
};

const onValidationSuccessed = () => {
  validateState.value = "success";
  validateMessage.value = "";
};
const onValidationFailed = (error) => {
  validateState.value = "error";
  validateMessage.value = error ? error.errors[0].message : "";
};

const validate: FormItemContext["validate"] = async (
  trigger: string,
  callback?
) => {
  const rules = getRuleFiltered(trigger);
  const modelName = props.prop;
  const validate = new AsyncValidator({
    [modelName]: rules,
  });
  const model = injectData?.model || {};
  return validate
    .validate({
      [modelName]: model[modelName],
    })
    .then(() => {
      onValidationSuccessed();
    })
    .catch((error) => {
      onValidationFailed(error);
      return Promise.reject(error);
    });
};
const context: FormItemContext = reactive({
  validate,
  ...props,
});
onMounted(()=>{
  injectData!.addFiled(context)
})
provide(formItemContextKey, context);
const validateState = ref<FormItemValidate>("");
const validateMessage = ref("");
</script>
