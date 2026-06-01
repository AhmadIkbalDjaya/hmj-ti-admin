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

const GENDER_OPTIONS = [
  { value: "male", label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
];

export default function MemberForm({
  form = {},
  handleChangeForm = () => {},
  errors = {},
  loading = false,
  positions = [],
}) {
  return (
    <CardSection title="Informasi Anggota">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Nama Anggota" required />
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
              placeholder="Masukkan Nama Anggota"
              fullWidth
              error={errors.name}
              helperText={errors.name}
            />
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Jenis Kelamin" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <Select
              id="gender"
              name="gender"
              value={form.gender ?? ""}
              onChange={handleChangeForm}
              fullWidth
              displayEmpty
              error={errors.gender}
            >
              <MenuItem value="" disabled>
                Pilih Jenis Kelamin
              </MenuItem>
              {GENDER_OPTIONS.map((gender) => (
                <MenuItem key={gender.value} value={gender.value}>
                  {gender.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={errors.gender}>{errors.gender}</FormHelperText>
          </SkeletonWrapper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Jabatan" required />
          <SkeletonWrapper
            loading={loading}
            variant="rectangular"
            height={32}
            sx={{ borderRadius: "4px" }}
          >
            <Select
              id="position_id"
              name="position_id"
              value={form.position_id}
              onChange={handleChangeForm}
              fullWidth
              displayEmpty
              error={errors.position_id}
            >
              <MenuItem value="" disabled>
                Pilih Jabatan
              </MenuItem>
              {positions.map((position) => (
                <MenuItem key={position.id} value={position.id}>
                  {position.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error={errors.position_id}>
              {errors.position_id}
            </FormHelperText>
          </SkeletonWrapper>
        </Grid>
      </Grid>
    </CardSection>
  );
}
