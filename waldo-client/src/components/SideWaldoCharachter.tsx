import { useCharacter } from "../hooks/store";
import { CharachterAvatar } from "./CharachterAvatar";

interface Props {
  gameIndex: number;
  orientation?: string;
  noChange?: boolean;
}

export function SideCharachterWaldo({
  gameIndex,
  orientation = "flex-row",
  noChange,
}: Props) {
  const avatars = useCharacter((s) => s.avatars[gameIndex]);

  return (
    <section
      className={`flex ${!noChange && "lg:flex-col"} p-2 gap-3 ${orientation}`}
    >
      {avatars.map((av, index) => {
        return <CharachterAvatar key={index} avatarObj={av} />;
      })}
    </section>
  );
}
