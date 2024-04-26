import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getPokemonList } from "../api/api";
import FilterSection from "./components/FilterSection/FilterSection";
import ListSection from "./components/ListSection/ListSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Query } from "../util/types";
import { ChangeEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { StyledEngineProvider } from "@mui/styled-engine";
import pageLogo from "../assets/page-logo.png";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const offset = searchParams.get("offset");
  const type = searchParams.get("type");
  const ability = searchParams.get("ability");
  const keyword = searchParams.get("keyword");
  const height = searchParams.get("height");
  const weight = searchParams.get("weight");
  const sort = searchParams.get("sort");

  const queryObj: Query = {
    offset,
    type,
    ability,
    keyword,
    height,
    weight,
    sort,
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["Pokemon-List", queryObj],
    queryFn: () => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return getPokemonList(queryObj);
    },
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError, navigate]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleClick = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.set("offset", "0");
    currentParams.set("limit", "9");
    currentParams.set("keyword", inputValue);
    setSearchParams(currentParams);
    setInputValue("");
  };

  const totalItems = data ? data.totalItems : 0;
  const pokemonList = data ? data.pagedPokemonList : [];

  return (
    <StyledEngineProvider injectFirst>
      <Container>
        <LogoWrapper>
          <PokedexLogo src={pageLogo} />
        </LogoWrapper>
        <SearchBox>
          <SearchIcon icon={faMagnifyingGlass} />
          <SearchInput
            placeholder="Pokemon Name or Number"
            value={inputValue}
            onChange={handleChange}
          />
          <SearchButton
            onClick={() => {
              if (inputValue) {
                handleClick();
              }
            }}
          >
            Search
          </SearchButton>
        </SearchBox>
        <Wrapper>
          <FilterSection />
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ListSection pokemonList={pokemonList} totalItems={totalItems} />
          )}
        </Wrapper>
      </Container>
    </StyledEngineProvider>
  );
};

const Container = styled.div``;

const LogoWrapper = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const PokedexLogo = styled.img`
  width: 300px;
`;

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

const SearchButton = styled(Button)`
  padding: 10px 28px;
  border-radius: 8px;
  background-color: #fdcb05;
  color: #3864d2;
  font-size: 12px;
  font-weight: 600;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 80px;
`;

export default Home;
