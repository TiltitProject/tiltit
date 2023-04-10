import { Audio } from "expo-av";

export default async function playSound(resource, volume) {
  const { sound } = await Audio.Sound.createAsync(resource);
  await sound.setVolumeAsync(volume);
  await sound.playAsync();
}
