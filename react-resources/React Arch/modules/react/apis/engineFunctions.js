function createElement(type, props, ...children) {
  return {
    type,
    props: props || {},
    children: children
      .flat()
      .map((c) =>
        typeof c === "object" ? c : { type: "__TEXT__", value: String(c) },
      ),
  };
}

function createTextNode(text) {
  return {
    type: "__TEXT__",
    props: {},
    children: [],
    value: String(text ?? ""),
  };
}

export { createElement, createTextNode };
