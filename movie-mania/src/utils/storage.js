import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveItem(key, value) {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch {}
}

export async function loadItem(key, fallback = null) {
  try {
    const json = await AsyncStorage.getItem(key);
    return json ? JSON.parse(json) : fallback;
  } catch {
    return fallback;
  }
}


