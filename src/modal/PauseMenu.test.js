import React from "react";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import store from "../store";
import PauseMenu from "./PauseMenu";

describe("Menu Modal", () => {
  it("opens pause menu when modal open", () => {
    const { queryByTestId, getByText } = render(
      <Provider store={store}>
        <PauseMenu />
      </Provider>,
    );

    expect(queryByTestId("select_stage_menu")).toBeNull();
    expect(getByText("MENU")).toBeTruthy();
  });
});
