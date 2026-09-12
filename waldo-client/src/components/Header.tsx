import waldoBoard from "../assets/logo/where-waldo-board.svg";
import waldoStanding from "../assets/logo/waldo-standing.svg";
import { useNavigate } from "react-router";

export function Header() {
  const navigate = useNavigate();
  return (
    <header className="h-25 w-full bg-[#4F6D7A] text-white flex justify-center items-center ">
      <div
        className="flex justify-center items-center h-full w-fit"
        onClick={() => navigate("/", { viewTransition: true })}
        style={{ cursor: "pointer" }}
      >
        <img
          src={waldoStanding}
          alt="game image"
          className="w-25 h-full object-cover m-0 p-0"
        />
        <img
          src={waldoBoard}
          alt=""
          className="w-35 h-full object-cover m-0 p-0   "
        />
      </div>
    </header>
  );
}
