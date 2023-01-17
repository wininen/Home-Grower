import {StyleSheet, Dimensions} from 'react-native';
const greatWidth = Dimensions.get('window').width * 0.5;
export const ScrollableTabBarStyles = StyleSheet.create({
  tabbar: {
    backgroundColor: '#2fa84e',
  },
  tab: {
    width: greatWidth,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    fontWeight: '400',
  },
});
