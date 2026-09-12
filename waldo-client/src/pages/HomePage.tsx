import waldoEasy from "../assets/images/game/levels/easy.jpg";
import waldoMedium from "../assets/images/game/levels/medium.jpg";
import waldoHard from "../assets/images/game/levels/hard.jpg";
import waldoGodMode from "../assets/images/game/levels/godMode.jpg";
import { Button } from "@radix-ui/themes";
import { useNavigate } from "react-router";

export function HomePage() {
  const navigate = useNavigate();
  const gameImages: Array<string> = [
    waldoEasy,
    waldoMedium,
    waldoHard,
    waldoGodMode,
  ];
  const levels: Array<String> = ["Easy", "Medium", "Hard", "God Mode"];
  return (
    <section className="w-full flex flex-col font-yuyu items-center p-10 gap-4">
      <h1 className="font-bold text-3xl md:text-6xl text-center mb-10  ">
        Are you ready to{" "}
        <span className=" highlight highlight-variant-12 after:bg-gradient-to-tr after:from-amber-500 after:to-sky-500">
          find
        </span>{" "}
        all the waldo's?
      </h1>
      <section className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full gap-5  ">
        {gameImages.map((img, index) => {
          return (
            <div
              className="flex text-white flex-col w-full justify-center items-center gap-2"
              key={index}
            >
              <p className="text-3xl font-bold highlight highlight-variant-18 after:bg-gradient-to-tr after:from-sky-500 after:to-red-500 ">
                {levels[index]}
              </p>
              <img
                src={img}
                alt="game image preview"
                className="w-full h-full object-cover border-2 border-amber-600"
              />

              <div className="flex  justify-center items-center min-w-0 gap-2">
                <Button
                  style={{ cursor: "pointer" }}
                  size={"2"}
                  color="red"
                  onClick={() =>
                    navigate(`play/${index}`, { viewTransition: true })
                  }
                >
                  {" "}
                  Start Game
                </Button>
                <Button
                  size={"2"}
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    navigate(`/leaderboard/${index}`, { viewTransition: true })
                  }
                >
                  Leaderboard
                </Button>
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
}
