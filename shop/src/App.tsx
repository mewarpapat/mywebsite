import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Scripts } from "./pages/Scripts";
import { ScriptDetail } from "./pages/ScriptDetail";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { OrderSuccess } from "./pages/OrderSuccess";
import { Faq } from "./pages/Faq";
import { Terms } from "./pages/Terms";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "scripts", Component: Scripts },
      { path: "scripts/:id", Component: ScriptDetail },
      { path: "cart", Component: Cart },
      { path: "checkout", Component: Checkout },
      { path: "order/:orderId", Component: OrderSuccess },
      { path: "faq", Component: Faq },
      { path: "terms", Component: Terms },
      { path: "*", Component: NotFound },
    ],
  },
]);
