import { ReactNode } from "react";

export default function PrimaryButton({
  url,
  children,
  onClick,
}: {
  url?: string;
  children?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <a
      href={url}
      target="_blank"
      className="bg-primary hover:text-primary hover:bg-white border hover:border-primary cursor-pointer text-white px-4 py-2 rounded mr-4"
    >
      {children}
    </a>
  );
}
