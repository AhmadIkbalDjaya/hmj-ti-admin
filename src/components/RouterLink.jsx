import React from "react";
import { Link } from "react-router-dom";

export const RouterLink = (props) => {
  return (
    <Link
      {...props}
      style={{
        textDecoration: "none",
        fontWeight: "700",
        fontSize: "12px",
        color: props.color ?? "#C4CDD5"
      }}
    >
      {props.children}
    </Link>
  );
};
