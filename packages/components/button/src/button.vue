<template>
  <button
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('disabled', disabled),
      bem.is('loading', loading),
    ]"
    :style="styleSetColor"
    :type="nativeType"
    :disabled="disabled || loading"
    @click="handleClick"
    @mousedown="handleMouseDown"
  >
    <template v-if="iconPlacement === 'left'">
      <lzy-icon
        v-if="loading"
        style="margin-right: 2px"
        :size="16"
        color="#fff"
      >
        <Loading />
      </lzy-icon>
      <slot v-else name="icon"></slot>
    </template>
    <slot></slot>
    <template v-if="iconPlacement === 'right'">
      <lzy-icon v-if="loading" style="margin-left: 2px" :size="16" color="#fff">
        <Loading />
      </lzy-icon>
      <slot v-else name="icon"></slot>
    </template>
  </button>
</template>

<script setup lang="ts">
import { buttonProps, buttonEmits } from "./button";
import { createNamespace } from "@lzy/utils/create";
import Loading from "@lzy/components/internal-icon/Loading";
import LzyIcon from "@lzy/components/icon";
import { computed } from "vue";
const props = defineProps(buttonProps);

const emit = defineEmits(buttonEmits);
const bem = createNamespace("button");
defineOptions({
  name: "lzy-button",
  inheritAttrs: false,
});
const styleSetColor = computed(() => {
  return props.color
    ? {
        background: props.color,
        borderColor: props.color,
      }
    : null;
});
const handleClick = (e: MouseEvent) => {
  emit("click", e);
};

const handleMouseDown = (e: MouseEvent) => {
  emit("mousedown", e);
};
</script>
<style scoped></style>
