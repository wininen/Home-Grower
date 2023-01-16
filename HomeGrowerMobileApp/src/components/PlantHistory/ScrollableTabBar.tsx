import * as React from 'react';
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

const ScrollableTabBar = () => {
  const [index, onIndexChange] = React.useState(1);
  const [routes] = React.useState([
    {key: 'livedata', title: 'Bieżące odczyty'},
    {key: 'planthistory', title: 'Wykresy historyczne'},
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
        lazy
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
