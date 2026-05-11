import { FormControl, MenuItem, Select } from "@mui/material";
import { CADRE_STATUS_OPTIONS } from "./CadreForm";

const BATCH_OPTIONS = ["2020", "2021", "2022", "2023", "2024", "2025"];

const CadreFilterBar = ({ filters, onChangeFilter }) => {
  return (
    <>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          id="batch"
          name="batch"
          value={filters.batch}
          onChange={onChangeFilter}
          displayEmpty
          defaultValue={null}
        >
          <MenuItem value={null}>Angkatan</MenuItem>
          {BATCH_OPTIONS.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }} size="small">
        <Select
          id="status"
          name="status"
          value={filters.status}
          onChange={onChangeFilter}
          displayEmpty
          defaultValue={null}
        >
          <MenuItem value={null}>Status</MenuItem>
          {CADRE_STATUS_OPTIONS.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default CadreFilterBar;
