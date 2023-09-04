
import NetInfo from '@react-native-community/netinfo';

// Check network connectivity

export const CheckNetworkConnectivity  = async ():Promise<boolean> => {
    
  try {
    const state = await NetInfo.fetch();
    if (state.isConnected) {
      console.log('Connected to the internet');
      return true;
    } else {
      console.log('No internet connection');
      return false;
    }
  } catch (error) {
    console.error('Error checking network connectivity:', error);
    return false;
  }
};
