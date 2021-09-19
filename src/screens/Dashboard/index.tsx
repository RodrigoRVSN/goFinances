import React from "react";
import HighlightCard from "../../components/HighlightCard";
import { cardsHighlightsContent } from "../../utils/CardsHighlightsContent";
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
} from "./styles";

export default function Dashboard() {
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
      </Transactions>
    </Container>
  );
}
