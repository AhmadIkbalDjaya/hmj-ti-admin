/* eslint-disable react/prop-types */
import { Box, FormHelperText, Typography } from "@mui/material";
import { CardSection } from "../../../components/CardSection";
import FilePondUpload from "../../../components/file-pond/Index";
import SkeletonWrapper from "../../../components/SkeletonWrapper";

export default function ImageUploadCard({
  title,
  name,
  currentImage,
  value,
  errors = {},
  loading = false,
  onChange = () => {},
}) {
  return (
    <CardSection title={title}>
      <SkeletonWrapper
        loading={loading}
        variant="rectangular"
        height={280}
        sx={{ borderRadius: "4px" }}
      >
        <Box display="flex" flexDirection="column" gap={1.5}>
          <Box
            sx={{
              border: "1px solid",
              borderColor: "slate-300",
              borderRadius: "4px",
              overflow: "hidden",
              height: 160,
              bgcolor: "gray-50",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {currentImage ? (
              <Box
                component="img"
                src={currentImage}
                alt={title}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <Typography variant="body2" color="gray-500">
                Belum ada gambar
              </Typography>
            )}
          </Box>
          <FilePondUpload
            name={name}
            maxFileSize="1MB"
            errors={errors}
            value={value}
            acceptedFileTypes={["image/*"]}
            onChange={onChange}
          />
          <FormHelperText>
            Kosongkan jika tidak ingin mengubah gambar
          </FormHelperText>
        </Box>
      </SkeletonWrapper>
    </CardSection>
  );
}
