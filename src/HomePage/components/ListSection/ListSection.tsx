import styled from "styled-components";
import ListItem from "./ListItem";
import { PokemonData } from "../../../util/types";
import PaginationButton from "./PaginationButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useSearchParams } from "react-router-dom";

interface Props {
  pokemonList: PokemonData[];
  totalItems: number;
}

const ListSection: React.FC<Props> = ({ pokemonList, totalItems }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortValue = searchParams.get("sort");
  const sort = sortValue ? sortValue : "";

  const handleChange = (event: SelectChangeEvent) => {
    const { value } = event.target;
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("offset", "0");
    currentParams.set("limit", "9");
    currentParams.set("sort", value);
    setSearchParams(currentParams);
  };

  return (
    <Container>
      <StyledFormControl variant="standard" sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Sort by Number
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={sort}
          onChange={handleChange}
          label="sort"
        >
          <MenuItem value="asc">Ascending Order</MenuItem>
          <MenuItem value="desc">Descending Order</MenuItem>
        </Select>
      </StyledFormControl>
      <ListWrapper>
        {pokemonList.map((data: PokemonData) => {
          return <ListItem key={data.id} pokemonData={data} />;
        })}
      </ListWrapper>
      {totalItems > 6 && <PaginationButton totalItems={totalItems} />}
      {pokemonList.length === 0 && <NotFound>Pokemon Not Found</NotFound>}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  text-align: right;
`;

const ListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  margin-bottom: 40px;
`;

const NotFound = styled.div`
  color: rgba(1, 1, 1, 0.5);
  font-size: 38px;
  font-weight: 700;
  text-align: center;
  margin-top: 180px;
`;

const StyledFormControl = styled(FormControl)`
  margin-bottom: 22px;
`;

export default ListSection;
