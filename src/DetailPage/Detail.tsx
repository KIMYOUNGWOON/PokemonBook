import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getPokemon } from "../api/api";
import PokemonList from "./components/PokemonList";
import PokemonProfile from "./components/PokemonProfile";
import PokemonStats from "./components/PokemonStats";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => {
      if (id) {
        return getPokemon(id);
      }
    },
    retry: false,
  });

  useEffect(() => {
    if (isError) {
      navigate("/404");
    }
  }, [isError, navigate]);

  if (!data || isLoading) {
    return (
      <LoadingSpinnerWrapper>
        <LoadingSpinner icon={faSpinner} spinPulse />
      </LoadingSpinnerWrapper>
    );
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
                } else {
                  alert("This is the first page.");
                }
              }}
            >
              <ArrowIcon icon={faArrowLeftLong} />
              <ArrowText>Prev</ArrowText>
            </ArrowWrapper>
            <PokemonNumber>{String(data.id).padStart(3, "0")}</PokemonNumber>
            <ArrowWrapper
              onClick={() => {
                if (data.id < 151) {
                  navigate(`/pokemon/${data.id + 1}`);
                } else {
                  alert("This is the last page.");
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

const LoadingSpinnerWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 240px 0 300px;
`;

const LoadingSpinner = styled(FontAwesomeIcon)`
  color: #3864d2;
  font-size: 60px;
`;

export default Detail;
