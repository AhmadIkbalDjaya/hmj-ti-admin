import { Link } from "react-router-dom";

export const AppLink = (props) => {
  return (
    <Link
      {...props}
      style={{
        textDecoration: "none",
        fontWeight: props.fontWeight ?? "700",
        fontSize: props.fontSize ?? "12px",
        color: props.color ?? "#C4CDD5",
        ...props.style,
      }}
    >
      {props.children}
    </Link>
  );
};
