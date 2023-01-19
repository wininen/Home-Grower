import React, {useState} from 'react';
import {
  TabView,
  TabBar,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import Layout from '../Layout/Layout.js';
import LiveData from '../MyPlant/MyPlant';
import PlantHistory from './PlantHistory';
import {ScrollableTabBarStyles} from './ScrollableTabBarStyles.js';

type State = NavigationState<{
  key: string;
  title: string;
}>;

const ScrollableTabBar = ({route}) => {
  const [index, onIndexChange] = useState(1);
  const [routes] = useState([
    {key: 'livedata', title: 'Bieżące odczyty', params: route.params},
    {key: 'planthistory', title: 'Wykresy historyczne', params: route.params},
  ]);

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={ScrollableTabBarStyles.indicator}
      style={ScrollableTabBarStyles.tabbar}
      tabStyle={ScrollableTabBarStyles.tab}
      labelStyle={ScrollableTabBarStyles.label}
    />
  );

  const renderScene = SceneMap({
    livedata: LiveData,
    planthistory: PlantHistory,
  });

  return (
    <Layout>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={onIndexChange}
      />
    </Layout>
  );
};

ScrollableTabBar.title = 'Scrollable tab bar';
ScrollableTabBar.backgroundColor = '#3f51b5';
ScrollableTabBar.appbarElevation = 0;

export default ScrollableTabBar;
