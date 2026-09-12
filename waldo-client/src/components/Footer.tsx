export function Footer() {
  return (
    <footer className="bg-[#4F6D7A] text-white flex flex-row justify-center items-center p-1 gap-4">
      <a
        className="flex justify-center items-center gap-2"
        href="https://github.com/Shriyashzzz/where-is-waldo"
        target="blank"
      >
        <img
          src="https://img.icons8.com/plasticine/100/github.png"
          alt="github"
          className="w-12 h-12"
        />
      </a>
      <a
        className="flex justify-center items-center gap-2"
        href="https://www.linkedin.com/in/shriyash-ghimire-73b385257/"
        target="blank"
      >
        <img
          src="https://img.icons8.com/doodle/48/linkedin--v2.png"
          alt="linkedin--v2"
          className="w-8 h-8"
        />
      </a>
      |<p className="font-serif text-balance">@Shriyashzzz</p>
    </footer>
  );
}
