import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPokemon } from "../api/api";
import PokemonList from "./components/PokemonList";
import PokemonProfile from "./components/PokemonProfile";
import PokemonStats from "./components/PokemonStats";
import SkeletonUi from "./components/SkeletonUi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => {
      if (id) {
        return getPokemon(id);
      }
    },
  });

  if (!data || isLoading) {
    return <SkeletonUi />;
  } else {
    return (
      <Container>
        <PokemonList />
        <PokemonInfoContainer>
          <SwitchingPages>
            <ArrowWrapper
              onClick={() => {
                if (data.id > 1) {
                  navigate(`/pokemon/${data.id - 1}`);
                }
              }}
            >
              <ArrowIcon icon={faArrowLeftLong} />
              <ArrowText>Prev</ArrowText>
            </ArrowWrapper>
            <PokemonNumber>{String(data.id).padStart(3, "0")}</PokemonNumber>
            <ArrowWrapper
              onClick={() => {
                if (data.id < 1302) {
                  navigate(`/pokemon/${data.id + 1}`);
                }
              }}
            >
              <ArrowText>Next</ArrowText>
              <ArrowIcon icon={faArrowRightLong} />
            </ArrowWrapper>
          </SwitchingPages>
          <PokemonProfile data={data} />
          <PokemonStats data={data} />
        </PokemonInfoContainer>
      </Container>
    );
  }
};

const Container = styled.div`
  display: flex;
  gap: 60px;
  margin-bottom: 80px;
`;

const PokemonInfoContainer = styled.div`
  flex: 1;
`;

const SwitchingPages = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArrowWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  &:hover {
    cursor: pointer;
  }
`;

const ArrowIcon = styled(FontAwesomeIcon)`
  color: #3864d2;
  font-size: 18px;
`;

const ArrowText = styled.div`
  color: #3864d2;
`;

const PokemonNumber = styled.div`
  color: #3864d2;
  font-weight: 700;
`;

export default Detail;
