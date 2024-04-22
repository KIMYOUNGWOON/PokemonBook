import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getPokemonList } from "../api/api";
import FilterSection from "./components/FilterSection/FilterSection";
import ListSection from "./components/ListSection/ListSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Query } from "../util/types";

const Home = () => {
  const [searchParams] = useSearchParams();
  const offset = searchParams.get("offset");
  const type = searchParams.get("type");

  const queryObj: Query = {
    offset,
    type,
  };

  const { data } = useQuery({
    queryKey: ["Pokemon-List", queryObj],
    queryFn: () => getPokemonList(queryObj),
  });

  console.log(data);
  const totalItems = data ? data.totalItems : 0;
  const pokemonList = data ? data.pagedPokemonList : [];

  return (
    <Container>
      <SearchBox>
        <SearchIcon icon={faMagnifyingGlass} />
        <SearchInput placeholder="Pokemon name or number or type" />
        <SearchButton>Search</SearchButton>
      </SearchBox>
      <Wrapper>
        <FilterSection />
        <ListSection pokemonList={pokemonList} totalItems={totalItems} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 20px;
  border: 2px solid #3864d2;
  border-radius: 8px;
  margin-bottom: 40px;
`;

const SearchIcon = styled(FontAwesomeIcon)`
  font-size: 20px;
  color: #3864d2;
  opacity: 0.6;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #3864d2;
  &::placeholder {
    font-size: 14px;
    color: #3864d2;
    opacity: 0.5;
  }
`;

const SearchButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 120px;
  height: 40px;
  background-color: #fdcb05;
  border-radius: 8px;
  color: #3864d2;
  font-size: 14px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
`;

export default Home;
