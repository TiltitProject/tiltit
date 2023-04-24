import React, { useState } from "react";
import { Provider } from "react-redux";

import usePreloadAssets from "./src/utils/usePreloadAssets";
import store from "./src/store";
import Root from "./src/Root";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  usePreloadAssets(setAppIsReady);

  return <Provider store={store}>{appIsReady ? <Root /> : null}</Provider>;
}
