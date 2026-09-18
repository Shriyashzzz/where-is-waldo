import { useParams } from "react-router";
export function LeaderBoardPage() {
  const { gameIndex } = useParams();
  console.log(gameIndex);
  return <></>;
}
