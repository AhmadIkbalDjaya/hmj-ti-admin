import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/authService";
import {
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { LuLogOut } from "react-icons/lu";

export const UserMenu = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    handleClose();
    try {
      await logout();
    } catch (error) {
      // Proceed with logout even if API call fails
    } finally {
      clearAuth();
      navigate("/login", { replace: true });
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        gap={1}
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      >
        <Avatar alt={user?.username || "User"} src="" />
        <Box display={{ xs: "none", md: "block" }}>
          <Typography
            color="gray-800"
            sx={{ fontSize: "14px", fontWeight: "bold" }}
          >
            {user?.username ?? "User"}
          </Typography>
          <Typography
            variant="subtitle2"
            color={"gray-500"}
            sx={{ fontSize: "10px", fontWeight: "bold" }}
          >
            {user?.email ?? ""}
          </Typography>
        </Box>
      </Box>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiList-root": {
            padding: "6px",
          },
        }}
      >
        <MenuItem onClick={handleLogout} sx={{ padding: "4px 12px" }}>
          <Box display={"flex"} gap={1} alignItems={"center"} color="red">
            <LuLogOut size={20} />
            <Typography textAlign="center" fontWeight={600}>
              Logout
            </Typography>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
};
