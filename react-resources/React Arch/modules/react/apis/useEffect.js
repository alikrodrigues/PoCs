import {
  currentComponent,
  hooksStore,
  getNextHookIndex,
  effectQueue,
} from "../dom-engines/renders.js";

function useEffect(fn, deps) {
  const compId = currentComponent;
  const idx = getNextHookIndex();

  if (!hooksStore.has(compId)) {
    hooksStore.set(compId, []);
  }
  const hooks = hooksStore.get(compId);

  const prev = hooks[idx];
  const changed =
    !prev || !deps || deps.some((d, i) => d !== (prev.deps || [])[i]);

  if (changed) {
    if (prev?.cleanup) prev.cleanup();
    effectQueue.push(() => {
      const cleanup = fn();
      hooks[idx] = { deps, cleanup };
    });
  }
}

export default useEffect;
