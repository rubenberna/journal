import React from "react";

export const Toolbar = (props) => {
  return (
    <>
      <div {...props} className="py-8 flex justify-around items-center w-2/4" />
      <hr />
      <div className="my-5" />
    </>
  );
};

export const BlockQuote = ({ attributes, children }) => {
  return (
    <div className="text-lg text-gray-500">
      <p {...attributes} className="italic">
        <span className="not-italic" contentEditable={false}>
          &#124;{" "}
        </span>
        {children}
      </p>
    </div>
  );
};

export const BulletList = (props) => {
  return (
    <ul className="list-disc" {...props.attributes}>
      {props.children}
    </ul>
  );
};

export const HeadingOne = ({ attributes, children }) => {
  return (
    <p className="text-3xl" {...attributes}>
      {children}
    </p>
  );
};

export const HeadingTwo = ({ attributes, children }) => {
  return (
    <p className="text-2xl" {...attributes}>
      {children}
    </p>
  );
};

export const ListItem = ({ attributes, children }) => {
  return <li {...attributes}>{children}</li>;
};

export const DefaultElement = ({ attributes, children }) => {
  return <p {...attributes}>{children}</p>;
};
