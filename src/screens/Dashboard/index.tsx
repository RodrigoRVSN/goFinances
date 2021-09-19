import React from "react";

import HighlightCard from "../../components/HighlightCard";
import TransactionCard, {
  TransactionCardProps,
} from "../../components/TransactionCard";

import { cardsHighlightsContent } from "../../utils/cardsHighlightsContent";
import {
  Container,
  Header,
  UserInfo,
  Photo,
  UserGreeting,
  UserName,
  User,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export default function Dashboard() {
  const data: DataListProps[] = [
    {
      id: "1",
      type: "positive",
      title: "Desenvolvimento de site",
      amount: "R$ 12000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "20/10/2020",
    },
    {
      id: "2",
      type: "negative",
      title: "Desenvolvimento de app",
      amount: "R$ 1000,00",
      category: { name: "Vendas", icon: "coffee" },
      date: "20/10/2021",
    },
    {
      id: "3",
      type: "positive",
      title: "Desenvolvimento de app",
      amount: "R$ 150,00",
      category: { name: "Comida", icon: "shopping-bag" },
      date: "20/10/2021",
    },
  ];

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/75763403?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>Rodrigo</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlightCards>
        {cardsHighlightsContent.map((item, index) => {
          return (
            <HighlightCard
              key={index}
              title={item.title}
              amount={item.amount}
              lastTransaction={item.lastTransaction}
              type={item.type}
            />
          );
        })}
      </HighlightCards>
      <Transactions>
        <Title>Listagem</Title>

        <TransactionList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  );
}
