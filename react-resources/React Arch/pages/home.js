import { createElement } from "../react/index.js";
import CounterApp from "../components/counter-app.js";

function Home(props) {
  return createElement(
    "div",
    { class: "home-container" },
    createElement("div", { class: "home-title" }, "My React App Home"),
    createElement("div", { class: "home-welcome" }, "Welcome to my React App"),
    createElement(CounterApp, {}),
  );
}

export default Home;
