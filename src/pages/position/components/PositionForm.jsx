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

export default function PositionForm({
  form = {},
  handleChangeForm = () => {},
  errors = {},
  loading = false,
}) {
  return (
    <CardSection title="Informasi Jabatan">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Nama Jabatan" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="name"
              name="name"
              type="string"
              value={form.name}
              onChange={handleChangeForm}
              placeholder="Masukkan Nama Jabatan"
              fullWidth
              error={errors.name}
              helperText={errors.name}
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
              placeholder="Contoh: ketua-umum"
              fullWidth
              error={errors.slug}
              helperText={errors.slug}
            />
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="Parent ID" />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="parent_id"
              name="parent_id"
              type="number"
              value={form.parent_id}
              onChange={handleChangeForm}
              placeholder="Kosongkan jika root"
              fullWidth
              error={errors.parent_id}
              helperText={errors.parent_id}
            />
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="Level" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="level"
              name="level"
              type="number"
              value={form.level}
              onChange={handleChangeForm}
              placeholder="Masukkan Level"
              fullWidth
              error={errors.level}
              helperText={errors.level}
            />
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="Urutan" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="order_index"
              name="order_index"
              type="number"
              value={form.order_index}
              onChange={handleChangeForm}
              placeholder="Masukkan Urutan"
              fullWidth
              error={errors.order_index}
              helperText={errors.order_index}
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
