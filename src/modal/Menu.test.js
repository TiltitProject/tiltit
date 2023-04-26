import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import Menu from "./Menu";
import store from "../store";

describe("Menu Modal", () => {
  it("opens pause menu when modal open", () => {
    const { queryByTestId, getByText } = render(
      <Provider store={store}>
        <Menu />
      </Provider>,
    );

    expect(queryByTestId("select_stage_menu")).toBeNull();
    expect(getByText("MENU")).toBeTruthy();
  });
});
