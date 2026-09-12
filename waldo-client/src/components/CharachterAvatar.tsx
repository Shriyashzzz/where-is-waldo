import { Avatar } from "radix-ui";
import { Check } from "lucide-react";

export interface AvatarObj {
  img: string;
  found: boolean;
}

interface Props {
  avatarObj: AvatarObj | undefined;
  name?: string;
}

export function CharachterAvatar({ avatarObj, name }: Props) {
  const found = avatarObj?.found ?? false;

  return (
    <Avatar.Root className="relative inline-flex size-11.25 select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle bg-white p-1">
      <Avatar.Image
        className={`size-full rounded-[inherit] object-contain cursor-pointer ${found && "pointer-events-none opacity-50"}`}
        src={avatarObj?.img}
        alt={name}
      />

      <Avatar.Fallback
        className="leading-1 flex size-full items-center justify-center bg-white text-[15px] font-medium text-violet11"
        delayMs={600}
      >
        CT
      </Avatar.Fallback>

      {found && (
        <div className="absolute inset-0 flex items-center justify-center rounded-[inherit] pointer-events-none highlight highlight-variant-3 highlight-sky-600">
          <Check
            className="size-7 text-gray-700 drop-shadow-sm"
            strokeWidth={4}
          />
        </div>
      )}
    </Avatar.Root>
  );
}
