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

const ScrollableTabBar = ({route}) => {
  const [index, onIndexChange] = React.useState(1);
  const [routes] = React.useState([
    {key: 'livedata', title: 'Bieżące odczyty', params: route.params},
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

  // const LiveData = ({route}: any) => (
  //   <View style={{flex: 1}}>
  //     <TouchableOpacity onPress={() => {}}>
  //       <Text>{JSON.stringify(route.params)}</Text>
  //     </TouchableOpacity>
  //   </View>
  // );

  const renderScene = SceneMap({
    livedata: LiveData,
    planthistory: PlantHistory,
  });

  //tutaj Gabrielu nwm jak to rozwiązać
  //dokumentacja: https://github.com/react-navigation/react-navigation/tree/main/packages/react-native-tab-view
  // const renderScene = ({route}) => {
  //   switch (route.key) {
  //     case 'livedata':
  //       return <MusicRoute foo={this.props.foo} />;
  //     case 'planthistory':
  //       return <AlbumsRoute jumpTo={jumpTo} />;
  //   }
  // };

  return (
    <Layout>
      <TabView
        //lazy
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
