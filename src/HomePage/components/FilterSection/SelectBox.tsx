import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "styled-components";
import { FilterSelectBoxData } from "../../../util/types";

interface Props {
  data: {
    name: string;
    labelName: string;
    menuList: string[];
  };
  selectBoxValue: FilterSelectBoxData;
  handleChange: (event: SelectChangeEvent) => void;
}

const SelectBox: React.FC<Props> = ({ data, selectBoxValue, handleChange }) => {
  return (
    <Box sx={{ minWidth: 220 }}>
      <StyledFormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{data.labelName}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={data.name}
          value={selectBoxValue[data.name]}
          label={data.labelName}
          onChange={handleChange}
        >
          {data.menuList.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </Box>
  );
};

const StyledFormControl = styled(FormControl)`
  .MuiOutlinedInput-root {
    margin-bottom: 40px;

    fieldset {
      border-color: #3864d2;
      border-width: 2px;
      border-radius: 8px;
    }
    &:hover fieldset {
      border-color: #3864d2;
      border-width: 3px;
    }
    &.Mui-focused fieldset {
      border-color: red;
    }
  }
`;

export default SelectBox;
