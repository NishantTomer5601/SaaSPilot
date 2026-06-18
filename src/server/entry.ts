import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import express from "express";
import compression from "compression";
import sirv from "sirv";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 5173;
const base = process.env.BASE || "/";

const templateHtml = isProduction
  ? fs.readFileSync(path.resolve(__dirname, "../../dist/client/index.html"), "utf-8")
  : "";

const app = express();
app.use(compression());

let vite: Awaited<ReturnType<typeof import("vite").createServer>> | undefined;

if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  app.use(base, sirv(path.resolve(__dirname, "../../dist/client"), { extensions: [] }));
}

app.use("*all", async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, "/");

    let template: string;
    let render: (url: string) => Promise<{ html: string; head: string }>;

    if (!isProduction) {
      template = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf-8");
      template = await vite!.transformIndexHtml(url, template);
      render = (await vite!.ssrLoadModule("/src/entry-server.tsx")).render;
    } else {
      template = templateHtml;
      const serverPath = path.resolve(__dirname, "../../dist/server/entry-server.js");
      render = (await import(pathToFileURL(serverPath).href)).render;
    }

    const { html, head } = await render(url);

    const responseHtml = template
      .replace("<!--app-head-->", head)
      .replace("<!--app-html-->", html);

    res.status(200).set({ "Content-Type": "text/html" }).send(responseHtml);
  } catch (e) {
    if (!isProduction && vite) {
      vite.ssrFixStacktrace(e as Error);
    }
    console.error(e);
    res.status(500).end((e as Error).stack);
  }
});

app.listen(port, () => {
  console.log(`SaaSPilot server running at http://localhost:${port}`);
});
