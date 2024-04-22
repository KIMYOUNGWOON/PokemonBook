import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getPokemon } from "../api/api";

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

  console.log(data);

  return <Container></Container>;
};

const Container = styled.div``;

export default Detail;
