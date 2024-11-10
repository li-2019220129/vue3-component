<template>
  <label for="" :class="bem.b()">
    <span :class="bem.e('input')">
      <input
        :disabled="disabled"
        v-model="model"
        type="checkbox"
        name=""
        id=""
        ref="checkboxRef"
        @click.stop
        @change="handleChange"
      />
    </span>
    <span :class="bem.e('label')" v-if="$slots.default || label">
      <slot></slot>
      <span v-if="!$slots.default">{{ label }}</span>
    </span>
  </label>
</template>

<script setup lang="ts">
import { createNamespace } from "@lzy/utils/create";
import { checkboxProps } from "./checkbox";
import { checkboxEmits } from "./checkbox";
import { computed, ref, watch, onMounted } from "vue";
const bem = createNamespace("checkbox");
const checkboxRef = ref();
defineOptions({
  name: "lzy-checkbox",
});
const props = defineProps(checkboxProps);

const emit = defineEmits(checkboxEmits);
const handleIndeterminate = () => {
  checkboxRef.value!.indeterminate = props.indeterminate;
};
const handleChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("change", target.checked);
};
watch(() => props.indeterminate, handleIndeterminate);

onMounted(() => {
  handleIndeterminate();
});

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>
<style></style>
