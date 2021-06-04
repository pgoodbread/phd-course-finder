import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t pt-8 text-xs text-center text-gray-400 mt-10 ">
      &copy; {new Date().getFullYear()}{" "}
      <Link href="/">
        <a className="hover:text-primary">PhD Course Finder Inc.</a>
      </Link>{" "}
      All Rights Reserved. |{" "}
      <Link href="/imprint">
        <a className="hover:text-primary">Imprint</a>
      </Link>
    </footer>
  );
}
