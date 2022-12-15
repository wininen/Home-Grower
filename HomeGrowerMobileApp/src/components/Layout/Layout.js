import React from 'react';
import Nav from '../Nav/Nav';
import {Container, Main} from './Layout.styled';

export const Layout = ({children}) => {
  return (
    <Container>
      <Main>{children}</Main>
      <Nav />
    </Container>
  );
};

export default Layout;
