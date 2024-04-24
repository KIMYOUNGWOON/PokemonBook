import styled from "styled-components";
import { PokemonData } from "../../util/types";
import { TYPE_COLOR } from "../../util/data";
import Stack from "@mui/material/Stack";
import { Gauge } from "@mui/x-charts/Gauge";

interface Props {
  data: PokemonData;
}

const PokemonStats: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <TypeAbilityWrapper>
        <KeyValueWrapper>
          <Key>Type : </Key>
          <ValueWrapper>
            {data.types.map((type) => (
              <TypeValue
                key={type}
                $fontColor={TYPE_COLOR[type].fontColor}
                $backgroundColor={TYPE_COLOR[type].backgroundColor}
              >
                {type}
              </TypeValue>
            ))}
          </ValueWrapper>
        </KeyValueWrapper>
        <KeyValueWrapper>
          <Key>Ability : </Key>
          <ValueWrapper>
            {data.abilities.map((ability) => (
              <AbilityValue key={ability}>{ability}</AbilityValue>
            ))}
          </ValueWrapper>
        </KeyValueWrapper>
      </TypeAbilityWrapper>
      <StatTitle>{data.name}'s Stats</StatTitle>
      <StackContainer direction={{ xs: "column", md: "row" }}>
        {data.stats.map((stat) => {
          return (
            <GaugeWrapper key={stat.name}>
              <GaugeTitle>{stat.name}</GaugeTitle>
              <StyledGauge width={140} height={140} value={stat.base_stat} />
            </GaugeWrapper>
          );
        })}
      </StackContainer>
    </Container>
  );
};

const Container = styled.div`
  padding-bottom: 40px;
`;

const TypeAbilityWrapper = styled.div`
  display: flex;
  gap: 60px;
  padding-left: 42px;
  margin-bottom: 70px;
`;

const KeyValueWrapper = styled.div``;

const Key = styled.div`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 18px;
`;

const ValueWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const TypeValue = styled.div<{ $backgroundColor: string; $fontColor: string }>`
  padding: 7px 18px 9px;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $fontColor }) => $fontColor};
  border-radius: 20px;
  font-size: 14px;
`;

const AbilityValue = styled.div`
  padding: 7px 18px 9px;
  background-color: rgba(1, 1, 1, 0.1);
  color: rgba(1, 1, 1, 0.7);
  border-radius: 20px;
  font-size: 14px;
`;

const StatTitle = styled.div`
  margin-bottom: 40px;
  padding-left: 42px;
  font-size: 24px;
  font-weight: 700;
`;

const StackContainer = styled(Stack)`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 40px;
  padding: 0 42px;
`;

const GaugeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
`;

const GaugeTitle = styled.div`
  padding: 6px 14px;
  border-radius: 8px;
  background-color: #fdcb05;
  color: #3864d2;
  font-weight: 700;
  font-size: 12px;
`;

const StyledGauge = styled(Gauge)``;

export default PokemonStats;
