import * as React from 'react';
import styled from 'styled-components';
import Exchanger from './containers/Exchanger';

export default class App extends React.Component {

  render() {
    return (
      <Container>
        <Exchanger />
      </Container>
    );
  }

}

const Container = styled.div`
  display: flex;
  flex: 1;
`;
