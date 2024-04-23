import styled from "styled-components";
import { getAllPokemon } from "../../api/api";
import PokemonListItem from "./PokemonListItem";
import pokedexLogo from "../../assets/page-logo.png";
import Button from "@mui/material/Button";
import { StyledEngineProvider } from "@mui/styled-engine";
import { useEffect, useState } from "react";
import { SubPokemonData } from "../../util/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";

const PokemonList = () => {
  const [offset, setOffset] = useState(0);
  const [tempPokemonList, setTempPokemonList] = useState<SubPokemonData[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ["allPokemon", offset],
    queryFn: () => getAllPokemon(offset),
  });

  useEffect(() => {
    const newPokemonList = data ? data : [];
    setTempPokemonList((prevList: SubPokemonData[]) => [
      ...prevList,
      ...newPokemonList.filter(
        (newPokemon) =>
          !prevList.some((prevPokemon) => prevPokemon.id === newPokemon.id)
      ),
    ]);
  }, [data]);

  const handleLoadMore = () => {
    setOffset((prevLimit) => prevLimit + 20);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Container>
        <PokedexLogo src={pokedexLogo} />
        <ListWrapper>
          {tempPokemonList.map((pokemon) => (
            <PokemonListItem key={pokemon.id} pokemon={pokemon} />
          ))}
          <StyledButton onClick={handleLoadMore}>
            {isLoading ? (
              <LoadingIndicator icon={faSpinner} spin />
            ) : (
              "READ MORE"
            )}
          </StyledButton>
        </ListWrapper>
      </Container>
    </StyledEngineProvider>
  );
};

const Container = styled.div``;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 500px;
  padding: 40px;
  border-radius: 10px;
  background-color: #f6f6f6;
  overflow-y: scroll;
`;

const PokedexLogo = styled.img`
  width: 180px;
  margin-bottom: 20px;
`;

const StyledButton = styled(Button)`
  padding: 14px 28px;
  border-radius: 8px;
  background-color: #fdcb05;
  color: #3864d2;
  font-size: 12px;
  font-weight: 600;
`;

const LoadingIndicator = styled(FontAwesomeIcon)`
  font-size: 22px;
`;

export default PokemonList;
