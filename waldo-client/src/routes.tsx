import { createBrowserRouter } from "react-router";
import App from "./App";

export const router = createBrowserRouter([
  { path: "/", element: <App />, children: [] }, // add more children routes to go from the app
]);
