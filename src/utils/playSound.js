import { Audio } from "expo-av";

export async function playSound(resource, volume) {
  const { sound } = await Audio.Sound.createAsync(resource);
  await sound.setVolumeAsync(volume);
  await sound.playAsync();
}

export async function playBGM(resource, volume) {
  const { sound } = await Audio.Sound.createAsync(resource, {
    isLooping: true,
  });

  await sound.setVolumeAsync(volume);
  await sound.playAsync();
}
