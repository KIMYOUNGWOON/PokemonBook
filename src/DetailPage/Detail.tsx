import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPokemon } from "../api/api";
import PokemonList from "./components/PokemonList";

const Detail = () => {
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => {
      if (id) {
        return getPokemon(id);
      }
    },
  });

  if (!data) {
    return;
  }

  console.log(data);

  return (
    <Container>
      <PokemonList />
      <PokemonInfoContainer>
        <TopWrapper>
          <Wrapper>
            <PokemonName>{data.name.toUpperCase()}</PokemonName>
            <PokemonNumber>No.{String(data.id).padStart(3, "0")}</PokemonNumber>
            <InfoContainer>
              <InfoWrapper>
                <Key>Height :</Key>
                <Value>{data.height}m</Value>
              </InfoWrapper>
              <InfoWrapper>
                <Key>Weight :</Key>
                <Value>{data.weight}kg</Value>
              </InfoWrapper>
              <InfoWrapper>
                <Key>Habitat :</Key>
                <Value>{data.habitat}</Value>
              </InfoWrapper>
              <InfoWrapper>
                <Key>Color :</Key>
                <Value>{data.color}</Value>
              </InfoWrapper>
            </InfoContainer>
          </Wrapper>
          <PokemonImage src={data.frontImage} />
        </TopWrapper>
      </PokemonInfoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 40px;
`;

const PokemonInfoContainer = styled.div`
  flex: 1;
  border: 2px solid #3864d2;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Wrapper = styled.div`
  padding-left: 42px;
`;

const PokemonName = styled.div`
  color: #3864d2;
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 10px;
`;

const PokemonNumber = styled.div`
  color: rgba(1, 1, 1, 0.2);
  font-size: 26px;
  font-weight: 900;
  margin-bottom: 40px;
`;

const PokemonImage = styled.img`
  width: 300px;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 60px;
`;

const InfoWrapper = styled.div`
  display: flex;
`;

const Key = styled.div`
  margin-right: 4px;
  font-weight: 700;
`;

const Value = styled.div`
  color: rgba(1, 1, 1, 0.5);
  font-weight: 500;
`;

export default Detail;
