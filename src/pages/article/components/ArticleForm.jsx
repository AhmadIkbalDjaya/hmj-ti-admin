import {
  Box,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import AppInputLabel from "../../../components/input/AppInputLabel";

export default function ArticleForm({
  form = {},
  handleChangeForm = () => {},
  errors = {},
}) {
  return (
    <Box
      sx={{
        background: "white",
        border: ".5px solid",
        borderColor: "slate-300",
        borderRadius: "4px",
      }}
    >
      <Box
        sx={{ p: "15px" }}
        borderBottom={"1px solid"}
        borderColor={"slate-300"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Typography variant="body2" sx={{ fontWeight: "600" }}>
          Informasi Berita
        </Typography>
      </Box>
      <Grid container spacing={2} padding={"15px"}>
        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Judul Berita" required />
          <TextField
            id="title"
            name="title"
            type="string"
            value={form.title}
            onChange={handleChangeForm}
            placeholder="Masukkan Judul Berita"
            fullWidth
            error={errors.title}
            helperText={errors.title}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AppInputLabel label="Slug" required />
          <TextField
            id="slug"
            name="slug"
            type="string"
            value={form.slug}
            onChange={handleChangeForm}
            placeholder="Contoh: judul-berita"
            fullWidth
            error={errors.slug}
            helperText={errors.slug}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="Tanggal Publikasi" required />
          <TextField
            id="publish_at"
            name="publish_at"
            type="date"
            value={form.publish_at}
            onChange={handleChangeForm}
            placeholder="Pilih Tanggal Publikasi"
            fullWidth
            error={errors.publish_at}
            helperText={errors.publish_at}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="Status" required />
          <Select
            id="is_active"
            name="is_active"
            value={form.is_active}
            onChange={handleChangeForm}
            fullWidth
            displayEmpty
            error={errors.is_active}
            defaultValue={1}
          >
            <MenuItem value={1}>Aktif</MenuItem>
            <MenuItem value={0}>Non Aktif</MenuItem>
          </Select>
          <FormHelperText error={errors.is_active}>
            {errors.is_active}
          </FormHelperText>
        </Grid>
        <Grid item xs={12} sm={4}>
          <AppInputLabel label="Unggulan" required />
          <Select
            id="is_featured"
            name="is_featured"
            value={form.is_featured}
            onChange={handleChangeForm}
            fullWidth
            displayEmpty
            error={errors.is_featured}
            defaultValue={0}
          >
            <MenuItem value={1}>Ya</MenuItem>
            <MenuItem value={0}>Tidak</MenuItem>
          </Select>
          <FormHelperText error={errors.is_featured}>
            {errors.is_featured}
          </FormHelperText>
        </Grid>
      </Grid>
    </Box>
  );
}
