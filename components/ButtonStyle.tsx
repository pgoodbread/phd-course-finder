import React from "react";

const ButtonStyle = React.forwardRef(
  (
    {
      children,
    }: {
      children: React.ReactElement;
    },
    ref
  ) => {
    return (
      <>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            className:
              "w-full border border-primary bg-primary hover:text-primary hover:bg-white text-white px-4 py-2 rounded my-4 focus:outline-none " +
              child.props.className,
            ref,
          });
        })}
      </>
    );
  }
);

export default ButtonStyle;
