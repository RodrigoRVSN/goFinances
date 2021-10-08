import React from "react";
import { render } from "@testing-library/react-native";

import { Profile } from "../../screens/Profile";

describe("Profile Screen", () => {
  it("Should show correctly user input name placeholder ", () => {
    const { getByPlaceholderText } = render(<Profile />);

    const inputName = getByPlaceholderText("Nome");

    expect(inputName).toBeTruthy();
  });

  it("Should load user data", () => {
    const { getByTestId } = render(<Profile />);

    const inputName = getByTestId("input-name");
    const inputPassword = getByTestId("input-password");

    expect(inputName.props.value).toEqual("Rodrigo");
    expect(inputPassword.props.value).toEqual("aoba");
  });

  it("Should render title correctly", () => {
    const { getByTestId } = render(<Profile />);

    const textTitle = getByTestId("text-title");

    expect(textTitle.props.children).toContain("Oi amor");
  });
});
