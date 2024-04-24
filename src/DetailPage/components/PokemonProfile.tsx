import styled from "styled-components";
import { PokemonData } from "../../util/types";

interface Props {
  data: PokemonData;
}

const PokemonProfile: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <InfoWrapper>
        <PokemonName>{data.name.toUpperCase()}</PokemonName>
        <PokemonNumber>No.{String(data.id).padStart(3, "0")}</PokemonNumber>
        <InfoContainer>
          <Wrapper>
            <Key>Height :</Key>
            <Value>{data.height}m</Value>
          </Wrapper>
          <Wrapper>
            <Key>Weight :</Key>
            <Value>{data.weight}kg</Value>
          </Wrapper>
          <Wrapper>
            <Key>Habitat :</Key>
            <Value>{data.habitat}</Value>
          </Wrapper>
          <Wrapper>
            <Key>Color :</Key>
            <Value>{data.color}</Value>
            <ColorChip $color={data.color} />
          </Wrapper>
        </InfoContainer>
      </InfoWrapper>
      <PokemonImage $imageUrl={data.frontImage} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  border-bottom: 1px solid #3864d2;
`;

const InfoWrapper = styled.div`
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

const PokemonImage = styled.div<{ $imageUrl: string }>`
  width: 300px;
  height: 300px;
  background-image: ${({ $imageUrl }) => `url(${$imageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px 60px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Key = styled.div`
  font-size: 14px;
  font-weight: 700;
`;

const Value = styled.div`
  color: rgba(1, 1, 1, 0.5);
  font-size: 14px;
  font-weight: 500;
`;

const ColorChip = styled.div<{ $color: string }>`
  width: 18px;
  height: 18px;
  background-color: ${({ $color }) => $color};
  border-radius: 50%;
`;

export default PokemonProfile;
