# icon

lzy-ui 推荐使用 xicons 作为图标库。

```
 $ pnpm install @vicons/ionicons5
```

## 使用规范

- 如果你想像用例一样直接使用，你需要全局注册组件，才能够直接在项目里面使用。

<script setup lang="ts">
    import {CashOutline} from '@vicons/ionicons5'
</script>
<lzy-icon color="#ccc" size="40">
    <CashOutline/>
</lzy-icon>
<lzy-icon color="#000" size="40">
    <CashOutline/>
</lzy-icon>

<div>
<lzy-icon color="#ccc" size="60">
    <CashOutline/>
</lzy-icon>
<lzy-icon color="#000" size="60">
    <CashOutline/>
</lzy-icon>

</div>

```vue
<script setup lang="ts">
import { CashOutline } from "@vicons/ionicons5";
</script>
<template>
  <lzy-icon color="green" size="40"><CashOutline /></lzy-icon>
</template>
```

## API

### Icon Props

| 名称  | 类型             | 默认值    | 说明     |
| ----- | ---------------- | --------- | -------- |
| color | string           | undefined | 图标颜色 |
| size  | number \/ string | undefined | 图标大小 |
