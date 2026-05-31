/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Container,
  Popover,
} from "@mui/material";
import { FiMenu, FiSearch } from "react-icons/fi";
import logoHmjTi from "../../assets/hmj-ti.png";
import { UserMenu } from "./UserMenu";
import { GlobalSearch } from "./GlobalSearch";

export const TopBar = ({ open, setOpen }) => {
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const searchOpen = Boolean(searchAnchorEl);

  const openMobileSearch = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  const closeMobileSearch = () => {
    setSearchAnchorEl(null);
  };

  return (
    <Container maxWidth="xl">
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
          minHeight: {
            sm: "0",
          },
        }}
      >
        <Box display={"flex"}>
          <IconButton
            color="gray-600"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
          >
            <FiMenu />
          </IconButton>
          <img src={logoHmjTi} width={100} alt="Logo HMJ TI" />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            marginLeft: {
              sm: "120px",
            },
          }}
          display={{ xs: "none", sm: "block" }}
        >
          <GlobalSearch />
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            aria-label="buka pencarian"
            onClick={openMobileSearch}
            sx={{ display: { xs: "inline-flex", sm: "none" }, color: "#454F5B" }}
          >
            <FiSearch />
          </IconButton>
          <UserMenu />
        </Box>
      </Toolbar>
      <Popover
        open={searchOpen}
        anchorEl={searchAnchorEl}
        onClose={closeMobileSearch}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            mt: 1,
            p: 1,
            width: "min(360px, calc(100vw - 24px))",
            overflow: "visible",
          },
        }}
      >
        <GlobalSearch
          autoFocus
          width="100%"
          placeholder="Cari data ..."
          onNavigate={closeMobileSearch}
        />
      </Popover>
    </Container>
  );
};
