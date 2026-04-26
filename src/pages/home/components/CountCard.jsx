import { Avatar, Box, Typography } from "@mui/material";
import { MdArticle } from "react-icons/md";
import SkeletonWrapper from "../../../components/SkeletonWrapper";

export const CountCard = ({
  title = "Proposal",
  count = 0,
  icon = <MdArticle size={20} color="#375DFB" />,
  bgIcon = "#DBE7FF",
  color = "#375DFB",
  subTitle = null,
  subTitleCount = null,
  loading = false,
}) => {
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      columnGap={2}
      p={1}
      mb={2}
      sx={{
        background: "white",
        borderRadius: "5px",
        boxShadow: 1,
      }}
      width={"100%"}
    >
      <Box sx={{ flexGrow: 1 }}>
        <SkeletonWrapper loading={loading}>
          <Typography
            variant="subtitle2"
            color="gray-500"
            fontWeight={"600"}
            textTransform={"uppercase"}
            fontSize={12}
          >
            {title}
          </Typography>
        </SkeletonWrapper>
        <Box display={"flex"} gap={"10px"} alignItems={"center"}>
          <SkeletonWrapper
            loading={loading}
            gridSx={{ width: { xs: "20%", sm: "30%" } }}
            height={"26px"}
            variant="rectangle"
            sx={{ borderRadius: "4px" }}
          >
            <Typography variant="h6" color="black" fontWeight={600}>
              {count}
            </Typography>
          </SkeletonWrapper>
          <SkeletonWrapper loading={loading}>
            <Typography variant="body2" color="inherit" fontWeight={600}>
              {title}
            </Typography>
          </SkeletonWrapper>
        </Box>
        <SkeletonWrapper loading={loading}>
          {subTitle && subTitleCount && (
            <Typography variant="subtitle2" color="gray-500" fontSize={12}>
              <Typography variant="inherit" color={color} display={"inline"}>
                {subTitleCount}{" "}
              </Typography>
              {subTitle}
            </Typography>
          )}
        </SkeletonWrapper>
      </Box>
      <Avatar
        sx={{
          bgcolor: bgIcon,
          width: "35px",
          height: "35px",
        }}
      >
        {icon}
      </Avatar>
    </Box>
  );
};
