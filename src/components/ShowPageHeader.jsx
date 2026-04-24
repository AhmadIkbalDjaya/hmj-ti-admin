import { Box, Button, Stack, Typography } from "@mui/material";
import { MdDelete, MdModeEdit } from "react-icons/md";

export default function ShowPageHeader({
  title,
  onDelete = null,
  articleId = null,
  itemId = null,
  editPath = null,
  loading = false,
}) {
  const resolvedId = itemId ?? articleId;
  const resolvedEditPath = editPath ?? (articleId ? `/articles/${articleId}/edit` : null);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      my={1}
      alignItems={"center"}
    >
      <Typography variant="h5" fontWeight={"600"}>
        {title}
      </Typography>
      {!loading && (
        <Stack direction={"row"} spacing={1}>
          {resolvedEditPath && (
            <Button
              variant="contained"
              size="small"
              startIcon={<MdModeEdit />}
              sx={{
                textTransform: "none",
                display: {
                  xs: "none",
                  sm: "inherit",
                },
              }}
              href={resolvedEditPath}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="contained"
              startIcon={<MdDelete />}
              size="small"
              sx={{
                textTransform: "none",
                display: {
                  xs: "none",
                  sm: "inherit",
                },
              }}
              onClick={() => onDelete(resolvedId)}
            >
              Delete
            </Button>
          )}
        </Stack>
      )}
    </Box>
  );
}
