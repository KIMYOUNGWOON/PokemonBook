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
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
  border: 2px solid #3864d2;
  border-radius: 8px;
  background-color: #fff;
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
