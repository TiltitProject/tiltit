import { useEffect } from "react";
import { Asset } from "expo-asset";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import * as staticImages from "../../assets/static";
import * as audio from "../../assets/audio";
import Dynamic from "../../assets/dynamicImage";
import gameFonts from "../../assets/fonts";

const usePreloadAssets = (setAppIsReady) => {
  const imageArray = Object.values(staticImages);
  const dynamicArray = Object.values(Dynamic);
  const audioArray = Object.values(audio);

  function cacheImagesAudio(images) {
    return images.map((image) => Asset.fromModule(image).downloadAsync());
  }

  function cacheFonts(fonts) {
    return fonts.map((font) => Font.loadAsync(font));
  }

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImagesAudio(imageArray);
        const audioAssets = cacheImagesAudio(audioArray);
        const dynamicImages = dynamicArray.map((images) =>
          cacheImagesAudio(images),
        );
        const fontAssets = cacheFonts(gameFonts);

        await Promise.all([
          ...imageAssets,
          ...dynamicImages,
          ...audioAssets,
          ...fontAssets,
        ]);
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
