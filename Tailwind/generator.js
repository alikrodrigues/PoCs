import theme from "./theme.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const utilityMap = {
  text: "color",
  bg: "background-color",
  p: "padding",
  m: "margin",
  w: "width",
  h: "height",
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractClasses(htmlContent) {
  const classRegex = /class="([^"]*)"/g;
  let classes = new Set();
  let match;

  while ((match = classRegex.exec(htmlContent)) !== null) {
    match[1].split(" ").forEach((cls) => classes.add(cls));
  }
  return Array.from(classes);
}

function classGenerator(classNames) {
  let cssOutput = "";
  classNames.forEach((className) => {
    const [prefix, ...valueParts] = className.split("-");
    const value = valueParts.join("-");

    const property = utilityMap[prefix];
    const themeValue = theme.colors[value] || theme.spacing[value];

    if (property && themeValue) {
      cssOutput += `.${className} { ${property}: ${themeValue}; }\n`;
    }
  });
  return cssOutput;
}

function build() {
  const htmlPath = path.join(__dirname, "index.html");
  const cssPath = path.join(__dirname, "output.css");

  const html = fs.readFileSync(htmlPath, "utf8");
  console.log(html);
  const classes = extractClasses(html);
  console.log("classes:", classes);
  const css = classGenerator(classes);

  fs.writeFileSync(cssPath, css);
}

function watch() {
  console.log("Watching index.html...");
  build();

  fs.watch(path.join(__dirname, "index.html"), (eventType) => {
    if (eventType === "change") {
      build();
    }
  });
}

watch();

// build();

// console.log(
//   extractClasses(
//     '<div> <button class="bg-blue p-4" /> <h2 class="text-red" /></div>',
//   ),
// );
// console.log(classGenerator("bg-blue"));
// console.log(classGenerator("p-4"));
