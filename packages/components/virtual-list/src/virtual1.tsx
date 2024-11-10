import { createNamespace } from "@lzy/utils/create";
import {
  h,
  defineComponent,
  inject,
  ref,
  computed,
  onMounted,
  watch,
} from "vue";
export default defineComponent({
  name: "LzyVirtualList",
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    size: {
      type: Number,
      default: 30,
    },
    remain: {
      type: Number,
      default: 5,
    },
  },
  setup(props, { slots }) {
    const bem = createNamespace("vl");
    const wrapperRef = ref<HTMLElement>();
    const barRef = ref<HTMLElement>();
    const listRef = ref<HTMLElement>();
    const state = ref({
      start: 0,
      end: props.remain,
    });
    const visibleData = computed(() => {
      return props.items.slice(
        state.value.start - prev.value,
        state.value.end + next.value
      );
    });
    const wrapperHeight = computed(() => {
      return `${props.remain * props.size}px`;
    });
    const barHeight = computed(() => {
      console.log(`${props.items.length * props.size}px`);

      return `${props.items.length * props.size}px`;
    });
    const prev = computed(() => {
      return Math.min(props.remain, state.value.start);
    });
    const next = computed(() => {
      return Math.min(props.remain, props.items.length - state.value.end);
    });
    watch(
      () => {
        props.items;
      },
      () => {
        barRef.value!.style.height = barHeight.value;
      },
      {
        deep: true,
      }
    );
    onMounted(() => {
      wrapperRef.value!.style.height = wrapperHeight.value;
      barRef.value!.style.height = barHeight.value;
    });
    const handleScroll = () => {
      const scrollTop = wrapperRef.value!.scrollTop;
      const start = Math.floor(scrollTop / props.size);
      const end = start + props.remain;
      state.value = { start, end };
      listRef.value!.style.transform = `translateY(${
        start * props.size - prev.value * props.size
      }px)`;
    };
    return () => {
      return (
        <div class={bem.b()} ref={wrapperRef} onScroll={handleScroll}>
          <div class={bem.e("scroll-bar")} ref={barRef}></div>
          <div class={bem.e("scroll-list")} ref={listRef}>
            {visibleData.value.map((node, index) => {
              return slots.default!({ node });
            })}
          </div>
        </div>
      );
    };
  },
});
