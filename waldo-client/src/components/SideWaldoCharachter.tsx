import { useCharacter } from "../hooks/store";
import { CharachterAvatar } from "./CharachterAvatar";

export function SideCharachterWaldo() {
  const avatars = useCharacter((s) => s.avatars);

  return (
    <section className="flex flex-row md:flex-col p-2 gap-3">
      {avatars.map((av, index) => {
        return <CharachterAvatar key={index} avatarObj={av} />;
      })}
    </section>
  );
}
