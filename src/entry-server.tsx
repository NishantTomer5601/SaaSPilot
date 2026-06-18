import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider, type HelmetServerState } from "@dr.pogodin/react-helmet";
import { App } from "./App";

export async function render(url: string) {
  let helmetState: HelmetServerState | undefined;

  const html = renderToString(
    <StrictMode>
      <HelmetProvider
        onServerState={(state) => {
          helmetState = state;
        }}
      >
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );

  const head = helmetState
    ? `${helmetState.title?.toString() ?? ""}${helmetState.meta?.toString() ?? ""}${helmetState.link?.toString() ?? ""}${helmetState.script?.toString() ?? ""}`
    : "";

  return { html, head };
}
