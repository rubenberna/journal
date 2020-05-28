import React, { useState } from "react";
import Link from "next/link";
import ListItem from "./ListItem";

const boldClass = "my-2 font-bold cursor-pointer flex items-center";
const defaultClass = "cursor-pointer flex items-center";
const italicClass = "italic cursor-pointer flex items-center";

const List = () => {
  const [active, setActive] = useState("Ruben Bernardes");

  return (
    <ul className="mt-10 w-1/6">
      <ListItem
        name="Ruben Bernardes"
        link="/"
        setActive={setActive}
        active={active}
        style={boldClass}
      />
      <ListItem
        name="Francis"
        link="/"
        setActive={setActive}
        active={active}
        style={defaultClass}
      />
      <ListItem
        name="Chloe"
        link="/"
        setActive={setActive}
        active={active}
        style={defaultClass}
      />
      <ListItem
        name="New Story"
        link="/createStory"
        setActive={setActive}
        active={active}
        style={italicClass}
      />
    </ul>
  );
};

export default List;

//  <Link href="/">
//    <li
//      className="my-2 font-bold cursor-pointer flex items-center"
//      onClick={() => setActive("ruben")}
//    >
//      Ruben Bernardes {renderIcon("ruben")}
//    </li>
//  </Link>;

//     <Link href="/createStory">
//       <li
//         className="italic cursor-pointer flex items-center"
//         onClick={() => setActive("new")}
//       >
//         New story {renderIcon("new")}
//       </li>
//     </Link>;
