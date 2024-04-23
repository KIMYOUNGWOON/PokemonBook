import styled from "styled-components";
import { SubPokemonData } from "../../util/types";
import { useNavigate } from "react-router-dom";

interface Props {
  pokemon: SubPokemonData;
}

const PokemonListItem: React.FC<Props> = ({ pokemon }) => {
  const navigate = useNavigate();

  return (
    <Container
      onClick={() => {
        navigate(`/pokemon/${pokemon.id}`);
      }}
    >
      <PokemonImage src={pokemon.frontImage} />
      <PokemonName>{pokemon.name}</PokemonName>
      <PokemonNumber>No.{String(pokemon.id).padStart(3, "0")}</PokemonNumber>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 230px;
  height: 72px;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.75);
  &:hover {
    cursor: pointer;
  }
`;

const PokemonImage = styled.img`
  width: 60px;
`;

const PokemonName = styled.div`
  font-size: 12px;
  font-weight: 700;
`;

const PokemonNumber = styled.div`
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: rgba(1, 1, 1, 0.3);
  font-size: 14px;
  font-weight: 700;
`;

export default PokemonListItem;
