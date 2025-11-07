import AsyncStorage from '@react-native-async-storage/async-storage';

// ✅ create helper functions for AsyncStorage
export const Storage = {
  setItem: async (key: string, value: string | number | boolean | object) => {
    try {
      if (typeof value === 'object') {
        await AsyncStorage.setItem(key, JSON.stringify(value));
      } else {
        await AsyncStorage.setItem(key, value.toString());
      }
    } catch (error) {
      console.error(`AsyncStorage setItem error for key: ${key}`, error);
    }
  },

  getItem: async <T = any>(key: string): Promise<T | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value === null) return null;

      try {
        return JSON.parse(value);
      } catch {
        // if not JSON, return as raw string/number/bool
        return value as unknown as T;
      }
    } catch (error) {
      console.error(`AsyncStorage getItem error for key: ${key}`, error);
      return null;
    }
  },

  getBoolean: async (key: string): Promise<boolean> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value === 'true';
    } catch {
      return false;
    }
  },

  getNumber: async (key: string): Promise<number | null> => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? Number(value) : null;
    } catch {
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`AsyncStorage removeItem error for key: ${key}`, error);
    }
  },

  clearAll: async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('AsyncStorage clearAll error', error);
    }
  },
};

export default Storage;
