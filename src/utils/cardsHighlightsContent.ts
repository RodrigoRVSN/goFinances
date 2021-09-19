interface Props {
  type: "up" | "down" | "total";
  title: string;
  amount: string;
  lastTransaction: string;
}

export const cardsHighlightsContent: Props[] = [
  {
    title: "Entradas",
    amount: "R$ 17.400,00",
    lastTransaction: "ùltima entrada 13 de abril",
    type: "up",
  },
  {
    title: "Saídas",
    amount: "R$ 1.254,00",
    lastTransaction: "ùltima entrada 03 de abril",
    type: "down",
  },
  {
    title: "Total",
    amount: "R$ 16.400,00",
    lastTransaction: "ùltima entrada 15 de abril",
    type: "total",
  },
];
