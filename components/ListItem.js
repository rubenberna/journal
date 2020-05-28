import React from "react";
import Link from "next/link";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ListItem = ({ name, link, setActive, active, style }) => {
  const renderIcon = (identifier) => {
    if (active === identifier)
      return <FontAwesomeIcon icon={faArrowLeft} className="w-2 ml-2" />;
    else return null;
  };
  return (
    <Link href={link}>
      <li className={style} onClick={() => setActive(name)}>
        {name}
        {renderIcon(name)}
      </li>
    </Link>
  );
};

export default ListItem;
