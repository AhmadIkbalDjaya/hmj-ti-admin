import logoHmjTi from "../../assets/hmj-ti.png";
import { useContext } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import {
  Box,
  Toolbar,
  List,
  Typography,
  IconButton,
  Avatar,
  Container,
  InputBase,
  CssBaseline,
} from "@mui/material";
import { FiMenu, FiSearch } from "react-icons/fi";
import { TiHome } from "react-icons/ti";
import { MdArticle, MdAddBusiness } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { DrawerListItem } from "./DrawerListItem";
import { DrawerOpen } from "../../context/DrawerOpen";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function BaseLayout(props) {
  const { open, setOpen } = useContext(DrawerOpen);
  const { children } = props;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "white",
        }}
      >
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
              <img src={logoHmjTi} width={100} />
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
            <Box display={"flex"} gap={1}>
              <Avatar alt="Remy Sharp" src="" />
              <Box display={{ xs: "none", md: "block" }}>
                <Typography
                  color="gray-800"
                  sx={{ fontSize: "14px", fontWeight: "bold" }}
                >
                  Aidil Ashyari
                </Typography>
                <Typography
                  variant="subtitle2"
                  color={"gray-500"}
                  sx={{ fontSize: "10px", fontWeight: "bold" }}
                >
                  Kabid Keilmuan
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        PaperProps={{
          style: {
            background: "#B20600",
          },
        }}
      >
        <DrawerHeader />
        <List
          sx={{
            margin: open ? "0 15px" : "0",
            color: "white",
          }}
        >
          <DrawerListItem
            open={open}
            toPage="/"
            icon={<TiHome size={24} color="white" />}
            text={"Dashboard"}
          />
          <DrawerListItem
            open={open}
            toPage="/article"
            icon={<MdArticle size={24} color="white" />}
            text={"Berita & Kegiatan"}
          />
          <DrawerListItem
            open={open}
            toPage="/business"
            icon={<MdAddBusiness size={24} color="white" />}
            text={"Ekonomi Kreatif"}
          />
          <DrawerListItem
            open={open}
            toPage="/member"
            icon={<BsFillPeopleFill size={24} color="white" />}
            text={"Anggota"}
          />
          <DrawerListItem
            open={open}
            toPage="/complaint"
            icon={<GoReport size={24} color="white" />}
            text={"Pesan & Masukan"}
          />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
