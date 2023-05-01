import { Audio } from "expo-av";

export default async function playAudio(resource) {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(resource);
    await soundObject.playAsync();
    setTimeout(() => {
      if (soundObject) {
        soundObject.unloadAsync();
      }
    }, 500);
  } catch (error) {
    console.warn("Failed to load and play audio:", error);
  }
}