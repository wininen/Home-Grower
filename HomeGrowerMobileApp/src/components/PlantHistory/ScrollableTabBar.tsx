import * as React from 'react';
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import LiveData from '../MyPlant/MyPlant';
import PlantHistory from './PlantHistory';
import {
  TabBarStyle,
  TabStyle,
  IndicatorStyle,
  LabelStyle,
} from './ScrollableTabBar.styled';

type State = NavigationState<{
  key: string;
  title: string;
}>;

const ScrollableTabBar = () => {
  const [index, onIndexChange] = React.useState(1);
  const [routes] = React.useState([
    {key: 'livedata', title: 'LiveData'},
    {key: 'planthistory', title: 'PlantHistory'},
  ]);

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      // indicatorStyle={IndicatorStyle}
      // style={TabBarStyle}
      // tabStyle={TabStyle}
      // labelStyle={LabelStyle}
    />
  );

  const renderScene = SceneMap({
    livedata: LiveData,
    planthistory: PlantHistory,
  });

  return (
    <TabView
      lazy
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={onIndexChange}
    />
  );
};

ScrollableTabBar.title = 'Scrollable tab bar';
ScrollableTabBar.backgroundColor = '#3f51b5';
ScrollableTabBar.appbarElevation = 0;

export default ScrollableTabBar;
