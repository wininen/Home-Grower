import React, {useContext} from 'react';
import {useRoute} from '@react-navigation/native';
import {NavigationContext} from '@react-navigation/native';
import {NavContainer, IconContainer, Icon, RoutName} from './Nav.styled';

const NavOption = ({navigate, routeName, redirectName, iconName, active}) => {
  return (
    <IconContainer onPress={() => navigate(redirectName)}>
      <Icon name={iconName} active={active} />
      <RoutName active={active}>{routeName}</RoutName>
    </IconContainer>
  );
};

export const Nav = () => {
  const route = useRoute();
  const navigation = useContext(NavigationContext);
  const navigate = dest => navigation.navigate(dest);

  return (
    <NavContainer>
      <NavOption
        iconName="light-up"
        routeName="Pogoda"
        redirectName="Forecast"
        navigate={navigate}
        active={route.name === 'Forecast'}
      />
      <NavOption
        iconName="flower"
        routeName="Rośliny"
        redirectName="Plants"
        navigate={navigate}
        active={route.name === 'Plants'}
      />
      <NavOption
        iconName="paypal"
        routeName="Sensor"
        redirectName="Home"
        navigate={navigate}
        active={route.name === 'Home'}
      />
      <NavOption
        iconName="youtube"
        routeName="Profil"
        redirectName="Profile"
        navigate={navigate}
        active={route.name === 'Profile'}
      />
    </NavContainer>
  );
};

export default Nav;
