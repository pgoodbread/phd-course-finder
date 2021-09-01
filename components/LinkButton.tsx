import Link from "next/link";
import React from "react";
export default function LinkButton({
  children,
  href,
  onClick,
  target,
  rel,
}: {
  children: React.ReactNode;
  href: string;
  onClick?: React.MouseEventHandler<Element>;
  target?: string;
  rel?: string;
}) {
  return (
    <Link href={href}>
      <a
        onClick={onClick}
        className="bg-primary mr-4 hover:text-primary hover:bg-white border hover:border-primary text-white px-4 py-2 rounded"
        target={target}
        rel={rel}
      >
        {children}
      </a>
    </Link>
  );
}
