import { Breadcrumbs } from "@mui/material";
import { MdNavigateNext } from "react-icons/md";
import { AppLink } from "../AppLink";

export default function AppBreadcrumbs({ children, items = [] }) {
  return (
    <Breadcrumbs separator={<MdNavigateNext style={{ marginTop: "3px" }} />}>
      {items.length > 0
        ? items.map((item, index) => (
            <AppLink
              key={index}
              to={item.to}
              color={index == items.length - 1 ? "black" : "inherit"}
            >
              {item.name}
            </AppLink>
          ))
        : children}
    </Breadcrumbs>
  );
}
