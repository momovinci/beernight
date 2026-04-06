import { createBrowserRouter } from "react-router";
import Theme1Cards from "./pages/Theme1Cards";
import Theme1Question from "./pages/Theme1Question";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Theme1Cards />,
  },
  {
    path: "/question",
    element: <Theme1Question />,
  },
]);