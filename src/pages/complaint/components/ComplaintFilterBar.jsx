import { FormControl, MenuItem, Select } from "@mui/material";

export const ComplaintFilterBar = ({ filters, onChangeFilter }) => {
  return (
    <>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          id="is_read"
          name="is_read"
          value={filters.is_read}
          onChange={onChangeFilter}
          displayEmpty
          defaultValue={null}
        >
          <MenuItem value={null}>Status</MenuItem>
          <MenuItem value={1}>Telah Dibaca</MenuItem>
          <MenuItem value={0}>Belum Dibaca</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};
