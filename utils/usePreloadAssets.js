import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { Asset } from "expo-asset";
import * as staticImages from "../assets/static";

const usePreloadAssets = (setAppIsReady, setRunning) => {
  const imageArray = Object.values(staticImages);

  function cacheImages(images) {
    return images.map((image) => Asset.fromModule(image).downloadAsync());
  }

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages(imageArray);

        await Promise.all(imageAssets);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    setRunning(true);
    loadResourcesAndDataAsync();
  }, []);
};

export default usePreloadAssets;
