// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { requestCurrencies } from '../../actions/actionCreators';
import { exchangerSelector, targetListSelector, initialListSelector } from '../../selectors/exchanger';
import type { Currency } from '../../typeDefinitions';
import Card from '../../components/Card';

type Props = {
    dispatch: Dispatch<*>,
    initialList: Array<Currency>,
    targetList: Array<Currency>,
    initialCurrencyKey: string,
    targetCurrencyKey: string,
};

class Exchanger extends React.Component<Props> {

    renderSection = (forInitialCurrency: boolean = false) => {
        const { initialList, targetList } = this.props;
        const currenciesList = forInitialCurrency ? initialList : targetList;

        return (
            <Section>
                <Carousel
                    wrapAround
                    style={{ flex: 1 }}
                >
                    {currenciesList.map(currency => (<Card
                        key={currency.key}
                        currency={currency}
                    />))}
                </Carousel>
            </Section>
        );
    };

    render() {
        return (
            <HorizontalContainer>
                <VerticalContainer>
                    <Body>
                        {this.renderSection(true)}
                        {this.renderSection()}
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

const Section = styled.div`
    flex: 1;
    display: flex;
`;

function mapStateToProps(state) {
    return {
        ...exchangerSelector(state),
        initialList: initialListSelector(state),
        targetList: targetListSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchanger);
