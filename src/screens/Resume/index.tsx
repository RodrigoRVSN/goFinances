import React from "react";
import { Container, Header, Title } from "./styles";
import { HistoryCard } from "../../components/HistoryCard";

export default function Resume() {
  return (
    <>
      <Container>
        <Header>
          <Title>Resumo por categoria</Title>
        </Header>
        <HistoryCard title="Compras" amount="RS 150" color="red" />
      </Container>
    </>
  );
}
