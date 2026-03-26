import {
  currentComponent,
  getNextHookIndex,
  hooksStore,
  scheduleRender,
} from "../dom-engines/renders.js";

function useState(initial) {
  const compId = currentComponent;
  const idx = getNextHookIndex();

  if (!hooksStore.has(compId)) hooksStore.set(compId, []);
  const hooks = hooksStore.get(compId);

  if (hooks[idx] === undefined) hooks[idx] = { value: initial };

  const hook = hooks[idx];

  function setState(newVal) {
    const nextVal = typeof newVal === "function" ? newVal(hook.value) : newVal;
    if (nextVal === hook.value) return;
    hook.value = nextVal;
    scheduleRender();
  }

  return [hook.value, setState];
}

export default useState;
