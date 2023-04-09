import { useEffect } from "react";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as staticImages from "../../assets/static";
import Dynamic from "../../assets/dynamicImage";

const usePreloadAssets = (setAppIsReady) => {
  const imageArray = Object.values(staticImages);

  function cacheImages(images) {
    return images.map((image) => Asset.fromModule(image).downloadAsync());
  }

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages(imageArray);
        const dynamicImages = cacheImages(Dynamic.runningVirtualGuy);

        await Promise.all([...imageAssets, ...dynamicImages]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);
};

export default usePreloadAssets;
