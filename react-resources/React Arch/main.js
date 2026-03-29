import { createElement, mount } from "./modules/react/index.js";
import Home from "./pages/home.js";

console.log("to passanod aqui ? ");
const rootContainer = document.getElementById("app-root");
const rootVNode = createElement(Home, {});

mount(rootVNode, rootContainer);
