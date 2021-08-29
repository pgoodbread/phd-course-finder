import Link from "next/link";
import React from "react";
// What does the question mark behind the props that we are passing in?
export default function Button({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <a className="bg-primary mr-4 hover:text-primary hover:bg-white border hover:border-primary text-white px-4 py-2 rounded">
        {children}
      </a>
    </Link>
  );
}
