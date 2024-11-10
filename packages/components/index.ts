import type { App } from "vue";
import button from "./button";
import input from "./input";
import checkout from "./checkbox";
import icon from "./icon";
import tree from "./tree";
import virtualList from "./virtual-list";
const arrType = [button, input, checkout, icon, tree, virtualList];
export default function (app: App) {
  arrType.forEach((component) => {
    app.use(component);
  });
}
