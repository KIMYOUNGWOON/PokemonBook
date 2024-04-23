import { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { SelectChangeEvent } from "@mui/material/Select";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectBox from "./SelectBox";
import { FILTER_SELECT_TYPE } from "../../../util/data";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import { StyledEngineProvider } from "@mui/styled-engine";
import { FilterCheckBoxData, FilterSelectBoxData } from "../../../util/types";

const initialSelectValue: FilterSelectBoxData = {
  type: "",
  ability: "",
};

const initialCheckValue: FilterCheckBoxData = {
  heightSmall: true,
  heightMedium: true,
  heightLarge: true,
  weightSmall: true,
  weightMedium: true,
  weightLarge: true,
};

const FilterSection = () => {
  const [selectBoxValue, setSelectBoxValue] = useState(initialSelectValue);
  const [checkBoxValue, setCheckBoxValue] = useState(initialCheckValue);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSelectChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    console.log(name, value);
    setSelectBoxValue({ ...selectBoxValue, [name]: value });
  };

  const handleCheckChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckBoxValue({ ...checkBoxValue, [name]: checked });
  };

  const handleClick = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("offset", "0");
    currentParams.set("limit", "9");

    if (selectBoxValue.type) {
      currentParams.set("type", selectBoxValue.type);
    }

    if (selectBoxValue.ability) {
      currentParams.set("ability", selectBoxValue.ability);
    }

    if (initialCheckValue.heightSmall) {
      currentParams.set("height", "small");
    }

    if (initialCheckValue.heightMedium) {
      currentParams.set("height", "medium");
    }

    if (initialCheckValue.heightLarge) {
      currentParams.set("height", "large");
    }

    if (initialCheckValue.weightSmall) {
      currentParams.set("weight", "small");
    }

    if (initialCheckValue.weightMedium) {
      currentParams.set("weight", "medium");
    }

    if (initialCheckValue.weightLarge) {
      currentParams.set("weight", "small medium large");
    }

    setSearchParams(currentParams);
  };

  const handleReset = () => {
    setSelectBoxValue(initialSelectValue);
    setCheckBoxValue(initialCheckValue);
    navigate("/");
  };

  return (
    <StyledEngineProvider injectFirst>
      <Container>
        <SelectBox
          data={FILTER_SELECT_TYPE.type}
          selectBoxValue={selectBoxValue}
          handleChange={handleSelectChange}
        />
        <SelectBox
          data={FILTER_SELECT_TYPE.ability}
          selectBoxValue={selectBoxValue}
          handleChange={handleSelectChange}
        />
        <StyledFormGroup>
          <CheckBoxTitle>Height</CheckBoxTitle>
          <StyledFormControlLabel
            control={
              <Checkbox
                name="heightSmall"
                checked={checkBoxValue.heightSmall}
                onChange={handleCheckChange}
              />
            }
            label="Small"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                name="heightMedium"
                checked={checkBoxValue.heightMedium}
                onChange={handleCheckChange}
              />
            }
            label="Medium"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                name="heightLarge"
                checked={checkBoxValue.heightLarge}
                onChange={handleCheckChange}
              />
            }
            label="Large"
          />
        </StyledFormGroup>
        <StyledFormGroup>
          <CheckBoxTitle>Weight</CheckBoxTitle>
          <StyledFormControlLabel
            control={
              <Checkbox
                name="weightSmall"
                checked={checkBoxValue.weightSmall}
                onChange={handleCheckChange}
              />
            }
            label="Small"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                name="weightMedium"
                checked={checkBoxValue.weightMedium}
                onChange={handleCheckChange}
              />
            }
            label="Medium"
          />
          <StyledFormControlLabel
            control={
              <Checkbox
                name="weightLarge"
                checked={checkBoxValue.weightLarge}
                onChange={handleCheckChange}
              />
            }
            label="Large"
          />
        </StyledFormGroup>
        <ButtonWrapper>
          <ApplyButton onClick={handleClick}>Apply</ApplyButton>
          <ResetButton onClick={handleReset}>Reset</ResetButton>
        </ButtonWrapper>
      </Container>
    </StyledEngineProvider>
  );
};

const Container = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledFormGroup = styled(FormGroup)`
  margin-bottom: 40px;
`;

const CheckBoxTitle = styled.div`
  margin-bottom: 12px;
  font-weight: 700;
`;

const StyledFormControlLabel = styled(FormControlLabel)`
  color: rgba(1, 1, 1, 0.6);
`;

const ApplyButton = styled(Button)`
  padding: 10px 28px;
  border-radius: 8px;
  background-color: #fdcb05;
  color: #3864d2;
  font-size: 12px;
  font-weight: 600;
`;

const ResetButton = styled(Button)`
  padding: 10px 28px;
  border: 2px solid #3864d2;
  border-radius: 8px;
  color: #3864d2;
  font-size: 12px;
  font-weight: 600;
`;

export default FilterSection;
