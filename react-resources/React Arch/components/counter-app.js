import { createElement, useEffect, useState } from "../modules/react/index.js";

function CounterApp(props) {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);

  useEffect(() => {
    document.title = `Count: ${count}`;
    return () => {
      document.title = "my-react";
    };
  }, [count]);

  return createElement(
    "div",
    {},
    createElement("div", {}, "my-react Counter"),
    createElement(
      "div",
      { style: { textAlign: "center", fontSize: "24px" } },
      count,
    ),
    createElement(
      "div",
      {},
      createElement(
        "button",
        { onClick: () => setCount((c) => c - step) },
        `− ${step}`,
      ),
      createElement("button", { onClick: () => setCount(0) }, "reset"),
      createElement(
        "button",
        { onClick: () => setCount((c) => c + step) },
        `+ ${step}`,
      ),
    ),
    createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "12px",
          color: "#777",
        },
      },
      createElement("span", {}, "step:"),
      createElement(
        "button",
        {
          style: { padding: "3px 10px", fontSize: "12px" },
          onClick: () => setStep((s) => Math.max(1, s - 1)),
        },
        "−",
      ),
      createElement(
        "span",
        { style: { color: "red", fontWeight: "600" } },
        step,
      ),
      createElement(
        "button",
        {
          style: { padding: "3px 10px", fontSize: "12px" },
          onClick: () => setStep((s) => s + 1),
        },
        "+",
      ),
    ),
  );
}

export default CounterApp;
