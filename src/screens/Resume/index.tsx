import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  ChartContent,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Month,
  LoadContainer,
} from "./styles";
import { HistoryCard } from "../../components/HistoryCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { categories } from "../../utils/categories";
import { VictoryPie } from "victory-native";
import { useFocusEffect } from "@react-navigation/core";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { addMonths } from "date-fns/esm";
import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ActivityIndicator } from "react-native";

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  function handleDateChange(action: "next" | "prev") {
    if (action === "next") {
      setSelectedDate(addMonths(selectedDate, 1));
    } else {
      setSelectedDate(subMonths(selectedDate, 1));
    }
  }

  async function loadData() {
    setIsLoading(true);
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted = response ? JSON.parse(response) : [];

    const expensives = responseFormatted.filter(
      (expensive: TransactionData) =>
        expensive.type === "negative" &&
        new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
        new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensivesTotal = expensives.reduce(
      (accumullator: number, expensive: TransactionData) => {
        return accumullator + expensive.amount;
      },
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expensives.forEach((expensive: TransactionData) => {
        if (expensive.category === category.key) {
          categorySum += Number(expensive.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });

        const percent = `${((categorySum / expensivesTotal) * 100).toFixed(
          0
        )}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          total: categorySum,
          color: category.color,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <>
      <Container>
        <Header>
          <Title>Resumo por categoria</Title>
        </Header>
        {isLoading ? (
          <LoadContainer>
            <ActivityIndicator color={theme.colors.secondary} size="large" />
          </LoadContainer>
        ) : (
          <>
            <Content
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                padding: 24,
                paddingBottom: useBottomTabBarHeight(),
              }}
            >
              <MonthSelect>
                <MonthSelectButton onPress={() => handleDateChange("prev")}>
                  <MonthSelectIcon name="chevron-left" />
                </MonthSelectButton>

                <Month>
                  {format(selectedDate, "MMMM, yyyy", { locale: ptBR })}
                </Month>

                <MonthSelectButton onPress={() => handleDateChange("next")}>
                  <MonthSelectIcon name="chevron-right" />
                </MonthSelectButton>
              </MonthSelect>

              <ChartContent>
                <VictoryPie
                  data={totalByCategories}
                  colorScale={totalByCategories.map(
                    (category) => category.color
                  )}
                  style={{
                    labels: {
                      fontSize: RFValue(18),
                      fontWeight: "bold",
                      fill: theme.colors.shape,
                    },
                  }}
                  labelRadius={80}
                  x="percent"
                  y="total"
                />
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
          </>
        )}
      </Container>
    </>
  );
}
