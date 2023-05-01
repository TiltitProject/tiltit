import { Audio } from "expo-av";

export async function playSound(state, setState, resource, volume) {
  const { sound } = await Audio.Sound.createAsync(resource);
  setState(sound);

  await sound.setVolumeAsync(volume);
  await sound.playAsync();

  setTimeout(() => {
    if (state) {
      state.unloadAsync();
    }
    setState(null);
  }, 50);
}

export async function playBGM(resource, volume) {
  const { sound } = await Audio.Sound.createAsync(resource, {
    isLooping: true,
  });

  await sound.setVolumeAsync(volume);
  await sound.playAsync();
}
