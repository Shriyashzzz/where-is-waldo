import { useCharacter } from "../hooks/store";
import { CharachterAvatar } from "./CharachterAvatar";

interface Props {
  gameIndex: number;
}

export function SideCharachterWaldo({ gameIndex }: Props) {
  const avatars = useCharacter((s) => s.avatars[gameIndex]);

  return (
    <section className="flex flex-row md:flex-col p-2 gap-3">
      {avatars.map((av, index) => {
        return <CharachterAvatar key={index} avatarObj={av} />;
      })}
    </section>
  );
}
