import { useEffect } from "react";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as staticImages from "../../assets/static";
import Dynamic from "../../assets/dynamicImage";

const usePreloadAssets = (setAppIsReady) => {
  const imageArray = Object.values(staticImages);
  const dynamicArray = Object.values(Dynamic);

  function cacheImages(images) {
    return images.map((image) => Asset.fromModule(image).downloadAsync());
  }

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages(imageArray);
        const dynamicImages = dynamicArray.map((images) => cacheImages(images));

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
