import { useCharacter } from "../hooks/store";
import { CharachterAvatar } from "./CharachterAvatar";

export function SideCharachterWaldo() {
  const avatars = useCharacter((s) => s.avatars);

  return (
    <section className="flex flex-col p-2 gap-3">
      {avatars.map((av) => {
        return <CharachterAvatar avatarObj={av} />;
      })}
    </section>
  );
}
