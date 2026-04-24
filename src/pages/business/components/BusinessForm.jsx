import {
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { CardSection } from "../../../components/CardSection";
import SkeletonWrapper from "../../../components/SkeletonWrapper";
import AppInputLabel from "../../../components/input/AppInputLabel";

export default function BusinessForm({
  form = {},
  handleChangeForm = () => {},
  errors = {},
  loading = false,
  submitLoading = false,
}) {
  return (
    <CardSection title="Informasi Usaha">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Nama Usaha" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="title"
              name="title"
              type="string"
              value={form.title}
              onChange={handleChangeForm}
              placeholder="Masukkan Nama Usaha"
              fullWidth
              error={errors.title}
              helperText={errors.title}
            />
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Slug" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="slug"
              name="slug"
              type="string"
              value={form.slug}
              onChange={handleChangeForm}
              placeholder="Contoh: nama-usaha"
              fullWidth
              error={errors.slug}
              helperText={errors.slug}
            />
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12}>
          <AppInputLabel label="Deskripsi" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={80}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="description"
              name="description"
              type="string"
              value={form.description}
              onChange={handleChangeForm}
              placeholder="Masukkan Deskripsi Usaha"
              fullWidth
              multiline
              rows={3}
              error={errors.description}
              helperText={errors.description}
            />
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="Harga" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChangeForm}
              placeholder="Masukkan Harga"
              fullWidth
              error={errors.price}
              helperText={errors.price}
            />
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="WhatsApp" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="whatsapp"
              name="whatsapp"
              type="string"
              value={form.whatsapp}
              onChange={handleChangeForm}
              placeholder="Contoh: 6281234567890"
              fullWidth
              error={errors.whatsapp}
              helperText={errors.whatsapp}
            />
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="Status" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <Select
              id="is_active"
              name="is_active"
              value={form.is_active}
              onChange={handleChangeForm}
              fullWidth
              displayEmpty
              error={errors.is_active}
            >
              <MenuItem value={1}>Aktif</MenuItem>
              <MenuItem value={0}>Non Aktif</MenuItem>
            </Select>
            <FormHelperText error={errors.is_active}>
              {errors.is_active}
            </FormHelperText>
          </SkeletonWrapper>
        </Grid>
      </Grid>
    </CardSection>
  );
}
