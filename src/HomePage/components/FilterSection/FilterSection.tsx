import { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";

const FilterSection = () => {
  const [type, setType] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: SelectChangeEvent) => {
    setType(event.target.value as string);
  };

  const handleClick = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("type", type);
    setSearchParams(currentParams);
  };

  return (
    <Container>
      <Box sx={{ minWidth: 220 }}>
        <StyledFormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value={"grass"}>Grass</MenuItem>
            <MenuItem value={"poison"}>Poison</MenuItem>
            <MenuItem value={"fire"}>Fire</MenuItem>
          </Select>
        </StyledFormControl>
      </Box>
      <ButtonWrapper>
        <ApplyButton onClick={handleClick}>Apply</ApplyButton>
        <ResetButton>Reset</ResetButton>
      </ButtonWrapper>
    </Container>
  );
};

const Container = styled.div``;

const StyledFormControl = styled(FormControl)`
  .MuiOutlinedInput-root {
    fieldset {
      border-color: #3864d2;
      border-width: 2px;
      border-radius: 8px;
    }
    &:hover fieldset {
      border-color: green;
    }
    &.Mui-focused fieldset {
      border-color: red;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ApplyButton = styled.div``;

const ResetButton = styled.div``;

export default FilterSection;
