import { Avatar } from "radix-ui";

interface Props {
  imgSrc: string;
  name: string;
}

export function CharachterAvatar({ imgSrc, name }: Props) {
  return (
    <Avatar.Root className="inline-flex size-11.25 select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle">
      <Avatar.Image
        className="size-full rounded-[inherit] object-cover"
        src={imgSrc}
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
