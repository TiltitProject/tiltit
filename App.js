import React, { useState } from "react";
import { Provider } from "react-redux";

import usePreloadAssets from "./src/utils/usePreloadAssets";
import GameView from "./src/GameView";
import store from "./src/store";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  usePreloadAssets(setAppIsReady);

  if (!appIsReady) {
    return null;
  }

  return <Provider store={store}>{appIsReady ? <GameView /> : null}</Provider>;
}
