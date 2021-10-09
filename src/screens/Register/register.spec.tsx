import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import theme from "../../global/styles/theme";

import { ThemeProvider } from "styled-components/native";
import { NavigationContainer } from "@react-navigation/native";

import Register from ".";

const Providers: React.FC = ({ children }) => (
  <NavigationContainer>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </NavigationContainer>
);

describe("Register", () => {
  it("should open category modal when click category button", () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");
    fireEvent.press(buttonCategory);

    expect(categoryModal.props.visible).toBeTruthy();
  });
});
