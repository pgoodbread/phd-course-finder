import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-wrap justify-center border-t pt-8 text-xs text-center text-gray-400 mt-10 ">
      <div className="inline w-full md:w-auto">
        &copy; {new Date().getFullYear()}{" "}
        <Link href="/">
          <a className="hover:text-primary">PhD Course Finder Inc.</a>
        </Link>{" "}
        All Rights Reserved. <span className="hidden md:inline">|</span>
      </div>
      <div className="inline mt-2 md:mt-0">
        <Link href="/imprint">
          <a className="hover:text-primary">&nbsp;Imprint</a>
        </Link>{" "}
        |{" "}
        <Link href="mailto:Sandra.Rudeloff@the-klu.org">
          <a className="hover:text-primary">Contact</a>
        </Link>
      </div>
    </footer>
  );
}
