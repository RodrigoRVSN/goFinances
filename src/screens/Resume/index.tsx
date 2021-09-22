import React, { useEffect, useState , useCallback} from "react";
import { Container, Header, Title, Content ,ChartContent} from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import {VictoryPie} from 'victory-native'
import { useFocusEffect } from "@react-navigation/core";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";

interface TransactionData {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
}
interface CategoryData {
  name: string;
  color: string;
  total: number;
  totalFormatted: string;
  key: string;
  percent: string;
}

export default function Resume() {
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const theme = useTheme();

  async function loadData() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];
    
    const expensives = responseFormatted.filter(
      (expensive: TransactionData) => expensive.type === "negative"
    );

    const expensivesTotal = expensives.reduce((accumullator: number, expensive: TransactionData)=>{return accumullator + expensive.amount;}, 0)

    const totalByCategory: CategoryData[] = [];

    categories.forEach(category => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if(expensive.category === category.key){
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${(categorySum / expensivesTotal * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          totalFormatted,
          percent
        });
      }
    });
    
    setTotalByCategories(totalByCategory);
  }

  useFocusEffect(useCallback(() => {
    loadData();
  },[]));

  return (
    <>
      <Container>
        <Header>
          <Title>Resumo por categoria</Title>
        </Header>
        <Content>
          <ChartContent>

          <VictoryPie 
          data={totalByCategories} 
          colorScale={totalByCategories.map(category => category.color)} 
          style={{
            labels: {fontSize: RFValue(18), fontWeight: 'bold', fill: theme.colors.shape}
          }} 
          labelRadius={80}
          x="percent" 
          y="total"/>
          </ChartContent>
          {totalByCategories.map((item) => (
            <HistoryCard
              key={item.key}
              title={item.name}
              amount={item.totalFormatted}
              color={item.color}
            />
          ))}
        </Content>
      </Container>
    </>
  );
}
