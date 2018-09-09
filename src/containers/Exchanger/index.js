// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import styled from 'styled-components';
import { requestCurrencies } from '../../actions/actionCreators';
import { exchangerSelector } from '../../selectors/exchanger';
import type { Currency } from '../../typeDefinitions';
import Card from '../../components/Card';

type Props = {
    dispatch: Dispatch<*>,
    currencies: Array<Currency>,
    initialCurrencyKey: string,
    targetCurrencyKey: string,
};

class Exchanger extends React.Component<Props> {

    render() {
        const { currencies } = this.props;

        console.log(currencies);

        return (
            <HorizontalContainer>
                <VerticalContainer>
                    <Body>
                        <Card />
                        <Card />
                    </Body>
                </VerticalContainer>
            </HorizontalContainer>
        );
    }

}

const HorizontalContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
`;

const VerticalContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Body = styled.div`
    width: 400px;
    height: 600px;
    background-color: #5badff;
    display: flex;
    flex-direction: column;
`;

function mapStateToProps(state) {
    return {
        ...exchangerSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchanger);
