import { List } from "@mui/material";
import { DrawerListItem } from "./DrawerListItem";
import { navConfig } from "./navConfig";

export const SideDrawer = ({ open }) => {
  return (
    <List
      sx={{
        margin: open ? "0 15px" : "0",
        color: "white",
      }}
    >
      {navConfig.map((item) => (
        <DrawerListItem
          key={item.toPage}
          open={open}
          toPage={item.toPage}
          icon={item.icon}
          text={item.text}
        />
      ))}
    </List>
  );
};
