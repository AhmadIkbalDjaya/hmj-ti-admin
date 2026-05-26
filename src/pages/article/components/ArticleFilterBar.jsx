import { FormControl, MenuItem, Select } from "@mui/material";

export const ArticleFilterBar = ({ filters, onChangeFilter }) => {
  return (
    <>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          id="is_active"
          name="is_active"
          value={filters.is_active}
          onChange={onChangeFilter}
          displayEmpty
          defaultValue={null}
        >
          <MenuItem value={null}>Status</MenuItem>
          <MenuItem value={1}>Aktif</MenuItem>
          <MenuItem value={0}>Non Aktif</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          id="is_featured"
          name="is_featured"
          value={filters.is_featured}
          onChange={onChangeFilter}
          displayEmpty
          defaultValue={null}
        >
          <MenuItem value={null}>Unggulan</MenuItem>
          <MenuItem value={1}>Ya</MenuItem>
          <MenuItem value={0}>Tidak</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
