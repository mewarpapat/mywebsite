import { createMemoryRouter } from "react-router";
import { Home } from "./pages/Home";
import { News } from "./pages/News";
import { Rules } from "./pages/Rules";
import { Whitelist } from "./pages/Whitelist";
import { RootLayout } from "./components/RootLayout";

export const router = createMemoryRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "news", Component: News },
      { path: "rules", Component: Rules },
      { path: "whitelist", Component: Whitelist },
    ],
  },
]);
