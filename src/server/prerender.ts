import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the index.html template
const templateHtml = fs.readFileSync(
  path.resolve(__dirname, "../../dist/client/index.html"),
  "utf-8"
);

// Import the render function from SSR build
const serverPath = path.resolve(__dirname, "../../dist/server/entry-server.js");
const { render } = await import(pathToFileURL(serverPath).href);

const routes = ["/", "/resources"];

console.log("Starting static prerendering...");

for (const route of routes) {
  const { html, head } = await render(route);

  const responseHtml = templateHtml
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);

  const outDir = path.resolve(__dirname, "../../dist/client", route.slice(1));
  if (route !== "/" && !fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outFile = route === "/"
    ? path.resolve(__dirname, "../../dist/client/index.html")
    : path.resolve(outDir, "index.html");

  fs.writeFileSync(outFile, responseHtml, "utf-8");
  console.log(`Prerendered: ${route} -> ${outFile}`);
}

console.log("Static prerendering completed successfully!");
