import DefaultTheme from "vitepress/theme";

import LzyIcon from "@lzy/components/icon";
import "@lzy/theme-chalk/src/index.scss";
export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(LzyIcon);
  },
};
