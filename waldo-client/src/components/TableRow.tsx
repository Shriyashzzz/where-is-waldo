interface Props {
  username: string;
  time: string;
}

export function TableRow({ username, time }: Props) {
  return (
    <div className="border-2 border-amber-300-700 p-2 w-full ">
      <div className="flex justify-evenly ">
        <p className="font-mono text-2xl highlight highlight-variant-2 highlight-sky-400">
          {username}
        </p>
        <p className="font-mono text-2xl highlight highlight-variant-18  highlight-red-400">
          {time}
        </p>
      </div>
    </div>
  );
}
