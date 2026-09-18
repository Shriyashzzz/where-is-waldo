import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { TableRow } from "../components/TableRow";
import { Spinner } from "@radix-ui/themes";
import { Button } from "@radix-ui/themes";

interface User {
  id: number;
  name: string;
}

interface Score {
  id: number;
  user: User;
  level: "Easy" | "Medium" | "Hard" | "God";
  time: string;
}

export function LeaderBoardPage() {
  const navigate = useNavigate();
  const { gameIndex } = useParams();
  const [leaderBoardScore, setLeaderBoardScore] = useState<Array<Score>>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    async function fetchLeaderBoard() {
      const response = await fetch(
        `/api/games/${gameIndex}/leaderBoard/highScores`,
        { method: "GET", credentials: "include" },
      );
      if (!response.ok) return navigate("/error");
      const data = await response.json();
      setLeaderBoardScore(data.leaderBoard);

      setIsLoading(false);
    }
    fetchLeaderBoard();
  }, []);
  if (isLoading) {
    return <Spinner />;
  }
  if (leaderBoardScore && leaderBoardScore.length != 0)
    return (
      <section className="flex flex-col w-4/5  items-center h-150 sm:mt-20 mt-3 overflow-y-auto">
        <div className="flex justify-evenly w-full text-5xl font-bold italic mb-3 ">
          <h2 className="text-sky-600">Player</h2>{" "}
          <h2 className="text-red-600">Time</h2>
        </div>

        {leaderBoardScore.map((scoreObj, index) => {
          return (
            <TableRow
              key={index}
              username={scoreObj.user.name}
              time={scoreObj.time}
            />
          );
        })}
      </section>
    );
  return (
    <section className=" h-150 sm:mt-10 mt-3 w-4/5 flex justify-center items-center flex-col gap-5">
      <h1 className="text-2xl h-fit italic highlight highlight-variant-4 after:bg-linear-to-tr highlight-spread-md after:from-sky-500 after:to-red-500">
        {" "}
        No scores recorded, be the first to beat this level ;&#41;
      </h1>
      <Button
        style={{ width: "fit-content", cursor: "pointer" }}
        color="red"
        onClick={() => navigate(`/play/${gameIndex}`, { viewTransition: true })}
      >
        {" "}
        <p className="italic">Let's Goo</p>
      </Button>
    </section>
  );
}
