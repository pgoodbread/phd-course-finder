import React from "react";

export default function ButtonStyle({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          className:
            "w-full border border-primary bg-primary hover:text-primary hover:bg-white text-white px-4 py-2 rounded my-4 focus:outline-none " +
            child.props.className,
        });
      })}
    </>
  );
}
