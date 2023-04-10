import { useEffect } from "react";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as staticImages from "../../assets/static";
import * as audio from "../../assets/audio";
import Dynamic from "../../assets/dynamicImage";

const usePreloadAssets = (setAppIsReady) => {
  const imageArray = Object.values(staticImages);
  const dynamicArray = Object.values(Dynamic);
  const audioArray = Object.values(audio);

  function cacheImages(images) {
    return images.map((image) => Asset.fromModule(image).downloadAsync());
  }

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages(imageArray);
        const audioAssets = cacheImages(audioArray);
        const dynamicImages = dynamicArray.map((images) => cacheImages(images));

        await Promise.all([...imageAssets, ...dynamicImages, ...audioAssets]);
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
