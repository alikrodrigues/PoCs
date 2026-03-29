import { createElement } from "../modules/react/index.js";
import Characteres from "../components/render-characteres.js";

function Home(props) {
  return createElement(
    "div",
    { class: "home-container" },
    createElement("div", { class: "home-title" }, "My React App Home"),
    createElement("div", { class: "home-welcome" }, "Welcome to my React App"),
    createElement(Characteres, {}),
    // createElement(CounterApp, {}),
  );
}

export default Home;
