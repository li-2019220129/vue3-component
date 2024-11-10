<template>
  <i :class="bem.b()" :style="style">
    <slot></slot>
  </i>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { createNamespace } from "@lzy/utils/create";
import { IconProps } from "./icon";
const bem = createNamespace("icon");
const props = defineProps(IconProps);

defineOptions({ name: "LzyIcon" });

const style = computed(() => {
  if (!props.color && !props.size) {
    return {};
  }
  return {
    ...(props.size ? { "font-size": props.size + "px" } : {}),
    ...(props.color ? { color: props.color } : {}),
  };
});
</script>
<style></style>
