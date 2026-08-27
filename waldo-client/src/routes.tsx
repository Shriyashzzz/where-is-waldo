import { createBrowserRouter } from "react-router";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { PlayGame } from "./pages/GamePlay";
import { LeaderBoardPage } from "./pages/LeaderBoard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/play",
        element: <PlayGame />,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoardPage />,
      },
    ],
  },
]);
