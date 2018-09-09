// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import styled from 'styled-components';
import Exchanger from './containers/Exchanger';
import { requestCurrencies } from './actions/actionCreators';

type Props = {
  dispatch: Dispatch<*>,
};

class App extends React.Component<Props> {

  componentDidMount() {
    this.props.dispatch(requestCurrencies());
  }

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

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(() => ({}), mapDispatchToProps)(App);
