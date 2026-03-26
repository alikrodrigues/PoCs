const hooksStore = new Map();
let hookIndex = 0;
function getNextHookIndex() {
  return hookIndex++;
}

let currentComponent = null;
const effectQueue = [];
let renderCount = 0;

let rootVNode = null;
let rootContainer = null;

function renderVNode(vnode, parentEl, oldDom) {
  if (!vnode) return null;
  // console.log("vnode", {vnode})
  if (vnode.type === "__TEXT__") {
    return document.createTextNode(vnode.value);
  }

  if (typeof vnode.type === "function") {
    return renderComponent(vnode, parentEl, oldDom);
  }

  console.log("oldDom tagname", oldDom?.tagName);
  console.log("vnode type", vnode?.type);
  const el =
    oldDom?.tagName?.toLowerCase() === vnode.type
      ? oldDom
      : document.createElement(vnode.type);

  patchProps(el, vnode.props, oldDom?.__prevProps || {});
  el.__prevProps = vnode.props;

  reconcileChildren(el, vnode.children, Array.from(el.childNodes));

  return el;
}

function renderComponent(vnode, parentEl, oldDom) {
  console.log("vnode type name", vnode.type.name, "vnode props", vnode.props);
  const compId = vnode.type.name + "_" + (vnode.props.__id || "0");
  const prev = currentComponent;
  const prevIdx = hookIndex;

  currentComponent = compId;
  hookIndex = 0;

  const output = vnode.type(vnode.props);
  console.log(output, "output");
  currentComponent = prev;
  hookIndex = prevIdx;

  const dom = renderVNode(output, parentEl, oldDom?.__componentDom);
  if (dom) dom.__componentDom = dom;
  console.log("dom renderedComponent", dom);
  return dom;
}

function reconcileChildren(parentEl, newChildren, oldNodes) {
  const max = Math.max(newChildren.length, oldNodes.length);
  const newDoms = [];

  for (let i = 0; i < max; i++) {
    const newChild = newChildren[i];
    const oldNode = oldNodes[i];

    if (!newChild) {
      oldNode && parentEl.removeChild(oldNode);
      continue;
    }

    const dom = renderVNode(newChild, parentEl, oldNode);
    newDoms.push(dom);

    if (!oldNode) parentEl.appendChild(dom);
    else if (dom !== oldNode) parentEl.replaceChild(dom, oldNode);
  }
}

function patchProps(el, newProps, oldProps) {
  // Remove props antigas
  for (const key in oldProps) {
    if (key === "children") continue;
    if (!(key in newProps)) {
      if (key.startsWith("on"))
        el.removeEventListener(key.slice(2).toLowerCase(), oldProps[key]);
      else el.removeAttribute(key);
    }
  }
  // Aplica props novas
  for (const key in newProps) {
    if (key === "children" || key === "__id") continue;

    const val = newProps[key];

    if (key === "style" && typeof val === "object") {
      Object.assign(el.style, val);
    } else if (key.startsWith("on")) {
      const event = key.slice(2).toLowerCase();
      if (oldProps[key]) el.removeEventListener(event, oldProps[key]);
      el.addEventListener(event, val);
    } else if (key === "checked") {
      el.checked = val;
    } else if (key === "value" && el.tagName === "INPUT") {
      if (el.value !== val) el.value = val;
    } else {
      el.setAttribute(key, val);
    }
  }
}

let pending = false;

function scheduleRender() {
  if (pending) return;
  pending = true;
  queueMicrotask(() => {
    pending = false;
    rerender();
  });
}

function rerender() {
  const oldDom = rootContainer.firstChild;
  const newDom = renderVNode(rootVNode, rootContainer, oldDom);
  if (newDom && newDom !== oldDom) {
    if (oldDom) rootContainer.replaceChild(newDom, oldDom);
    else rootContainer.appendChild(newDom);
  }
  flushEffects();
}

function flushEffects() {
  while (effectQueue.length) effectQueue.shift()();
}

function mount(vnode, container) {
  rootVNode = vnode;
  rootContainer = container;
  console.log("FIRST CHILD:", container.firstChild);
  const dom = renderVNode(vnode, container, container.firstChild);
  console.log("VDOM:", dom);

  if (!container.contains(dom)) container.appendChild(dom);

  console.log("container", container);

  flushEffects();
}

export {
  patchProps,
  renderVNode,
  renderComponent,
  reconcileChildren,
  mount,
  scheduleRender,
  currentComponent,
  hooksStore,
  getNextHookIndex, // Exporta a função em vez da variável diretamente
  effectQueue,
};
