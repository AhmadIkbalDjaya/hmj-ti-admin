import { FormControl, MenuItem, Select } from "@mui/material";

export const BusinessFilterBar = ({ filters, onChangeFilter }) => {
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
    </>
  );
};
