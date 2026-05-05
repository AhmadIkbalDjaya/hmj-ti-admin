import { Breadcrumbs } from "@mui/material";
import { MdNavigateNext } from "react-icons/md";
import { AppLink } from "../AppLink";

export default function AppBreadcrumbs({ children, items = [] }) {
  return (
    <Breadcrumbs
      separator={<MdNavigateNext style={{ marginTop: "3px" }} />}
      sx={{
        "& .MuiBreadcrumbs-ol": {
          flexWrap: "nowrap",
        },
        overflowX: "auto",
      }}
    >
      {items.length > 0
        ? items.map((item, index) => (
            <AppLink
              key={index}
              to={item.to}
              color={index == items.length - 1 ? "black" : "inherit"}
              style={{ whiteSpace: "nowrap" }}
            >
              {item.name}
            </AppLink>
          ))
        : children}
    </Breadcrumbs>
  );
}
