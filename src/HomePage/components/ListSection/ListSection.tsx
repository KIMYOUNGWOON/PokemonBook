import styled from "styled-components";
import ListItem from "./ListItem";
import { PokemonData } from "../../../util/types";
import PaginationButton from "./PaginationButton";

interface Props {
  pokemonList: PokemonData[];
  totalItems: number;
}

const ListSection: React.FC<Props> = ({ pokemonList, totalItems }) => {
  return (
    <Container>
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

export default ListSection;
