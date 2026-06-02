import { useEffect } from "react";
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
import { useGetPositions } from "../../../hooks/modules/usePosition";

export const POSITION_LEVEL_OPTIONS = [
  { value: 0, label: "Presidium" },
  { value: 1, label: "Wakil Ketua" },
  { value: 2, label: "Bidang" },
  { value: 3, label: "Ketua Bidang" },
  { value: 4, label: "Anggota" },
];

export const getPositionLevelLabel = (level) =>
  POSITION_LEVEL_OPTIONS.find((option) => option.value === Number(level))
    ?.label ?? "Anggota";

export default function PositionForm({
  form = {},
  handleChangeForm = () => {},
  handleSlugChange = () => {},
  errors = {},
  loading = false,
  allowedLevels = POSITION_LEVEL_OPTIONS,
  showParentField = true,
  lockParent = false,
  lockLevel = false,
  parentLabel = "",
}) {
  const { positions, fetchPositions } = useGetPositions();

  useEffect(() => {
    if (showParentField && !parentLabel) {
      fetchPositions({ page: 1, limit: 1000 });
    }
  }, [showParentField, parentLabel]);

  const resolvedParentLabel =
    parentLabel ||
    positions.find((position) => position.id === Number(form.parent_id))?.name ||
    "-";

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
              onChange={handleSlugChange}
              placeholder="Contoh: ketua-umum"
              fullWidth
              error={errors.slug}
              helperText={errors.slug}
            />
          </SkeletonWrapper>
        </Grid>
        {showParentField && (
          <Grid item xs={12} sm={4}>
            <AppInputLabel label="Atasan" />
            <SkeletonWrapper
              loading={loading}
              variant="rectangular"
              height={32}
              sx={{ borderRadius: "4px" }}
            >
              {lockParent ? (
                <TextField
                  value={resolvedParentLabel}
                  fullWidth
                  disabled
                />
              ) : (
                <Select
                  id="parent_id"
                  name="parent_id"
                  value={form.parent_id}
                  onChange={handleChangeForm}
                  fullWidth
                  displayEmpty
                  error={errors.parent_id}
                >
                  <MenuItem value="" disabled>
                    Pilih Atasan
                  </MenuItem>
                  {positions.map((position) => (
                    <MenuItem key={position.id} value={position.id}>
                      {position.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            </SkeletonWrapper>
          </Grid>
        )}
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="Level" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            {lockLevel ? (
              <TextField
                value={getPositionLevelLabel(form.level)}
                fullWidth
                disabled
                error={errors.level}
                helperText={errors.level}
              />
            ) : (
              <>
                <Select
                  id="level"
                  name="level"
                  value={form.level}
                  onChange={handleChangeForm}
                  fullWidth
                  displayEmpty
                  error={errors.level}
                >
                  <MenuItem value="" disabled>
                    Pilih Level
                  </MenuItem>
                  {allowedLevels.map((level) => (
                    <MenuItem key={level.value} value={level.value}>
                      {level.label}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText error={errors.level}>
                  {errors.level}
                </FormHelperText>
              </>
            )}
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel
            label="Urutan"
            required
            info="Menentukan urutan tampilan (angka lebih kecil muncul pertama)"
          />
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
