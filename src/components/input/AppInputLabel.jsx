import { Box, Tooltip, Typography } from "@mui/material";
import { GoInfo } from "react-icons/go";

export default function AppInputLabel({
  label = "Name",
  required = false,
  info,
  ...props
}) {
  return (
    <Box display={"flex"} height={"25px"} alignItems={"center"}>
      <Typography
        variant="body2"
        fontWeight={"600"}
        display={"flex"}
        sx={{ textTransform: "capitalize" }}
        {...props}
      >
        {label}
      </Typography>
      {required ? <Typography color={"red"}>*</Typography> : ""}
      {info && (
        <Tooltip
          arrow
          title={info}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -10],
                  },
                },
              ],
            },
          }}
          sx={{ cursor: "pointer" }}
        >
          <Box>
            <GoInfo style={{ marginLeft: "5px" }} color="#637381" size={15} />
          </Box>
        </Tooltip>
      )}
    </Box>
  );
}
