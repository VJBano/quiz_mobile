import AsyncStorage from "@react-native-async-storage/async-storage";

const LocalStorage = {

    setItem: async (key:string, value:string) => {
        try {
            await AsyncStorage.setItem(key, value);
            return true
          } catch (error) {
            console.error('Error saving data:', error);
          }
    },

    getItem: async (key:string) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
              return value
            } else {
                return ""
            }
          } catch (error) {
            console.error('Error loading data:', error);
          }
    },

    clearItem:async () => {
        try {
            await AsyncStorage.clear();
            console.log('Storage cleared');
          } catch (error) {
            console.error('Error clearing storage:', error);
          }
    }
}

export default LocalStorage