import { Box, Typography, Skeleton } from "@mui/material";
import { MdOutlineDateRange } from "react-icons/md";
import { FiExternalLink } from "react-icons/fi";
import { formatDate } from "../../../helpers/dateHelpers";
import { AppLink } from "../../../components/AppLink";

export const FeaturedArticles = ({ articles = [], loading = false }) => {
  return (
    <Box
      sx={{
        background: "white",
        border: ".5px solid",
        borderColor: "slate-300",
        borderRadius: "4px",
        height: "100%",
      }}
    >
      <Box
        sx={{ p: "15px" }}
        borderBottom={"1px solid"}
        borderColor={"slate-300"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Typography variant={"body"} sx={{ fontWeight: "600" }}>
          Berita Unggulan
        </Typography>
      </Box>
      <Box>
        {loading
          ? [...Array(4)].map((_, index) => (
              <Box
                key={index}
                sx={{
                  paddingY: "12px",
                  paddingX: "15px",
                  borderBottom: "1px solid",
                  borderColor: "slate-300",
                }}
              >
                <Skeleton variant="text" width="80%" height={24} />
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Skeleton variant="text" width="40%" height={16} />
                  <Skeleton variant="circular" width={16} height={16} />
                </Box>
              </Box>
            ))
          : articles.map((article, index) => (
              <Box
                key={index}
                sx={{
                  paddingY: "8px",
                  paddingX: "15px",
                  borderBottom: "1px solid",
                  borderColor: "slate-300",
                }}
              >
                <Typography
                  variant={"body"}
                  sx={{
                    fontWeight: "600",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {article.title}
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  sx={{ color: "gray-500" }}
                >
                  <Box display={"flex"} columnGap={"4px"} alignItems={"center"}>
                    <MdOutlineDateRange />
                    <Typography variant={"caption"} sx={{ fontWeight: "600" }}>
                      {formatDate(article.publish_at) || "-"}
                    </Typography>
                  </Box>
                  <AppLink
                    to={`/articles/${article.id}`}
                    style={{ color: "inherit", display: "flex" }}
                  >
                    <FiExternalLink size={16} />
                  </AppLink>
                </Box>
              </Box>
            ))}
      </Box>
    </Box>
  );
};
