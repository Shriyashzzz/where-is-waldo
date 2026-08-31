import { Avatar } from "radix-ui";

export interface AvatarObj {
  img: string;
  found: boolean;
}

interface Props {
  avatarObj: AvatarObj | undefined;
  name: string;
}

export function CharachterAvatar({ avatarObj, name }: Props) {
  return (
    <Avatar.Root className="inline-flex size-11.25 select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
      <Avatar.Image
        className={`size-full rounded-[inherit] object-contain cursor-pointer ${avatarObj && avatarObj.found && "pointer-events-none grayscale opacity-50"}`}
        src={avatarObj ? avatarObj.img : ""}
        alt={name}
      />
      <Avatar.Fallback
        className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
        delayMs={600}
      >
        CT
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
