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

export const CADRE_STATUS_OPTIONS = [
  { value: "active", label: "Aktif" },
  { value: "inactive", label: "Tidak Aktif" },
  { value: "transferred", label: "Pindah" },
  { value: "graduated", label: "Lulus" },
];

export default function CadreForm({
  form = {},
  handleChangeForm = () => {},
  errors = {},
  loading = false,
}) {
  return (
    <CardSection title="Informasi Kader">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Nama Kader" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="name"
              name="name"
              type="text"
              value={form.name ?? ""}
              onChange={handleChangeForm}
              placeholder="Masukkan Nama Kader"
              fullWidth
              error={!!errors.name}
              helperText={errors.name}
            />
          </SkeletonWrapper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Angkatan" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="batch"
              name="batch"
              type="text"
              value={form.batch ?? ""}
              onChange={handleChangeForm}
              placeholder="Contoh: 2023"
              fullWidth
              error={!!errors.batch}
              helperText={errors.batch}
            />
          </SkeletonWrapper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Status" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <Select
              id="status"
              name="status"
              value={form.status ?? ""}
              onChange={handleChangeForm}
              fullWidth
              displayEmpty
              error={!!errors.status}
            >
              <MenuItem value="" disabled>
                Pilih Status
              </MenuItem>
              {CADRE_STATUS_OPTIONS.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={!!errors.status}>
              {errors.status}
            </FormHelperText>
          </SkeletonWrapper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Alamat" />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <TextField
              id="address"
              name="address"
              type="text"
              value={form.address ?? ""}
              onChange={handleChangeForm}
              placeholder="Masukkan Alamat"
              fullWidth
              error={!!errors.address}
              helperText={errors.address}
            />
          </SkeletonWrapper>
        </Grid>
      </Grid>
    </CardSection>
  );
}
