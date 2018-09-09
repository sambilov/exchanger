// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import styled from 'styled-components';
import { requestCurrencies } from '../../actions/actionCreators';
import { exchangerSelector } from '../../selectors/exchanger';

type Props = {
    dispatch: Dispatch<*>,
    currencies: Array<Object>,
    currectCurrencyKey: string,
    exchangeToCurrencyKey: string,
};

class Exchanger extends React.Component<Props> {

    render() {
        const { currencies } = this.props;

        console.log(currencies);

        return (
            <HorizontalContainer>
                <VerticalContainer>
                    <Body>
                        exchanger
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
