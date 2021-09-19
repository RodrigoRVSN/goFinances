import React from "react";

import HighlightCard from "../../components/HighlightCard";
import TransactionCard from "../../components/TransactionCard";

import { getBottomSpace } from "react-native-iphone-x-helper";
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

export default function Dashboard() {
  const data = [
    {
      title: "Desenvolvimento de site",
      amount: "R$ 12000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "20/10/2020",
    },
    {
      title: "Desenvolvimento de app",
      amount: "R$ 15000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
      date: "20/10/2021",
    },
    {
      title: "Desenvolvimento de app",
      amount: "R$ 15000,00",
      category: { name: "Vendas", icon: "dollar-sign" },
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
          renderItem={({ item }) => <TransactionCard data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: getBottomSpace() }}
        />
      </Transactions>
    </Container>
  );
}
