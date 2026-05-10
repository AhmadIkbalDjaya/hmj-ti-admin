import { TiHome } from "react-icons/ti";
import { MdArticle, MdAddBusiness, MdWorkspaces } from "react-icons/md";
import { BsFillPeopleFill } from "react-icons/bs";
import { GoReport } from "react-icons/go";
import { FaPeopleGroup } from "react-icons/fa6";

export const navConfig = [
  {
    toPage: "/",
    icon: <TiHome size={24} color="white" />,
    text: "Dashboard",
  },
  {
    toPage: "/articles",
    icon: <MdArticle size={24} color="white" />,
    text: "Berita & Kegiatan",
  },
  {
    toPage: "/businesses",
    icon: <MdAddBusiness size={24} color="white" />,
    text: "Ekonomi Kreatif",
  },
  {
    toPage: "/positions",
    icon: <MdWorkspaces size={24} color="white" />,
    text: "Jabatan",
  },
  {
    toPage: "/members",
    icon: <BsFillPeopleFill size={24} color="white" />,
    text: "Anggota",
  },
  {
    toPage: "/complaints",
    icon: <GoReport size={24} color="white" />,
    text: "Pesan & Masukan",
  },
  {
    toPage: "/cadres",
    icon: <FaPeopleGroup size={24} color="white" />,
    text: "Kader",
  },
];
