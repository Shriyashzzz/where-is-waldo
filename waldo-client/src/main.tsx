import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { router } from "./routes.tsx";
import { RouterProvider } from "react-router/dom";
import { Theme } from "@radix-ui/themes";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </StrictMode>,
);
