import { createApp } from "vue";
import "./styles/index.css";
import App from "./App.vue";
import icon from "@lzy/components/icon/index";
import tree from "@lzy/components/tree/index";
import checkout from "@lzy/components/checkbox/index";
import button from "@lzy/components/button/index";
import input from "@lzy/components/input/index";
import "@lzy/theme-chalk/src/index.scss";

const plugin = [icon, tree, checkout, button, input];

const app = createApp(App);
plugin.forEach((plugin) => {
  app.use(plugin);
});

app.mount("#app");
