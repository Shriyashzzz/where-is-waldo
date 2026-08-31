import { createBrowserRouter } from "react-router";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { PlayGame } from "./pages/GamePlay";
import { LeaderBoardPage } from "./pages/LeaderBoard";
import { Error } from "./pages/Error";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/play/:gameNumber",
        element: <PlayGame />,
      },
      {
        path: "/leaderboard",
        element: <LeaderBoardPage />,
      },
    ],
  },
]);
