import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

export const DrawerListItem = ({ open, selected, icon, text }) => {
  return (
    <ListItem
      disablePadding
      sx={{
        display: "block",
        my: "15px",
      }}
    >
      <ListItemButton
        selected={selected}
        sx={{
          justifyContent: open ? "initial" : "center",
          px: open ? "10px" : 2.5,
          py: "5px",
          borderRadius: "3px",
          "&.Mui-selected": {
            background: "#C21010",
            "&:hover": {
              backgroundColor: "#C21010",
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 1 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText sx={{ opacity: open ? 1 : 0 }}>
          <Typography fontSize={14} fontWeight={"bold"}>
            {text}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};
