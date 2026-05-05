import {
  Box,
  Toolbar,
  IconButton,
  Container,
  InputBase,
} from "@mui/material";
import { FiMenu, FiSearch } from "react-icons/fi";
import logoHmjTi from "../../assets/hmj-ti.png";
import { UserMenu } from "./UserMenu";

export const TopBar = ({ open, setOpen }) => {
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
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={1}
            sx={{
              backgroundColor: "zinc-200",
              width: "250px",
              padding: "0 10px",
              boxSizing: "border-box",
              borderRadius: "3px",
            }}
          >
            <FiSearch color="#637381" />
            <InputBase
              placeholder="Cari sesuatu ..."
              sx={{
                flexGrow: 1,
                color: "gray-500",
                fontWeight: "bold",
                placeholder: {
                  color: "gray-500",
                  fontWeight: "bold",
                },
              }}
            />
          </Box>
        </Box>
        <UserMenu />
      </Toolbar>
    </Container>
  );
};
