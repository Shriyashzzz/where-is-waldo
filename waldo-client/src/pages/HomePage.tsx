import waldoPreview from "../../public/assets/images/gameImage/game.jpg";
import { Button } from "@radix-ui/themes";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <section className="h-full flex flex-col font-yuyu items-center p-20 gap-4">
      <h1 className="font-bold text-6xl">
        Are you ready to find all the waldo's?
      </h1>
      <img
        src={waldoPreview}
        alt="game image preview"
        className="w-100 h-50 border-2 border-amber-600"
      />
      <div className="felx justify-center items-center gap-4">
        <Button
          style={{ cursor: "pointer", marginRight: "1rem" }}
          size={"3"}
          color="red"
          onClick={() => navigate("/play", { viewTransition: true })}
        >
          {" "}
          Start Game
        </Button>
        <Button
          size={"3"}
          style={{ cursor: "pointer", marginLeft: "1rem" }}
          onClick={() => navigate("/leaderboard", { viewTransition: true })}
        >
          <HamburgerMenuIcon /> View Leaderboard
        </Button>
      </div>
    </section>
  );
}
