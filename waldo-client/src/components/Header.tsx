import waldoBoard from "../assets/logo/where-waldo-board.svg";
import waldoStanding from "../assets/logo/waldo-standing.svg";

export function Header() {
  return (
    <header className="h-25 w-full bg-amber-200 flex justify-center items-center m">
      <div className="flex justify-center items-center h-full w-full">
        <img
          src={waldoStanding}
          alt=""
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
