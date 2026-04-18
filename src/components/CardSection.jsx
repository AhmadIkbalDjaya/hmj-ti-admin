import { Box, FormHelperText, Typography } from "@mui/material";

export const CardSection = ({ title, helperText, required, sx, children }) => {
  return (
    <Box
      sx={{
        background: "white",
        border: ".5px solid",
        borderColor: "slate-300",
        borderRadius: "4px",
        ...sx,
      }}
    >
      {title && (
        <Box
          sx={{ p: "15px" }}
          borderBottom={"1px solid"}
          borderColor={"slate-300"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box>
            <Typography variant="body2" sx={{ fontWeight: "600" }}>
              {title} {required && <span style={{ color: "red" }}>*</span>}
            </Typography>
            {helperText && (
              <FormHelperText error sx={{ mt: 0 }}>
                {helperText}
              </FormHelperText>
            )}
          </Box>
        </Box>
      )}
      <Box padding={"15px"}>{children}</Box>
    </Box>
  );
};
