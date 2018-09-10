// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { setConvertCurrencies, startConverRatePolling, endConverRatePolling } from '../../actions/actionCreators';
import { exchangerSelector, currenciesIndexSelector } from '../../selectors/exchanger';
import type { Currency } from '../../typeDefinitions';
import Card from '../../components/Card';

type Props = {
    dispatch: Dispatch<*>,
    currencies: Array<Currency>,
    initialIndex: number,
    targetIndex: number,
    initialCurrencyKey: string,
    targetCurrencyKey: string,
    convertRate: number,
};

class Exchanger extends React.Component<Props> {

    componentDidMount() {
        const { dispatch } = this.props;

        dispatch(startConverRatePolling());
    }

    componentWillUnmount() {
        const { dispatch } = this.props;

        dispatch(endConverRatePolling());
    }

    handleBeforeSlide = (isInitial: boolean, slideIndex: number) => {
        const { dispatch, currencies, initialCurrencyKey, targetCurrencyKey } = this.props;
        const newCurrency = currencies[slideIndex];
        const newCurrencyKey = newCurrency.key;
        const newInitialCurrencyKey = isInitial ? newCurrencyKey : initialCurrencyKey;
        const newTargetCurrencyKey = isInitial ? targetCurrencyKey : newCurrencyKey;

        dispatch(setConvertCurrencies(newInitialCurrencyKey, newTargetCurrencyKey));
    };

    renderSection = (slideIndex: number, isInitial: boolean = false) => {
        const { currencies } = this.props;

        return (
            <Section isInitial={isInitial}>
                <Carousel
                    wrapAround
                    afterSlide={slideIndex => this.handleBeforeSlide(isInitial, slideIndex)}
                    slideIndex={slideIndex}
                    style={{
                        flex: 1,
                    }}
                >
                    {currencies.map(currency => (<Card
                        key={currency.key}
                        currency={currency}
                    />))}
                </Carousel>
            </Section>
        );
    };

    render() {
        const { currencies, initialIndex, targetIndex, convertRate } = this.props;

        return (
            <HorizontalContainer>
                <VerticalContainer>
                    <Head>
                        convert rate {convertRate}
                    </Head>
                    <Body>

                        {this.renderSection(initialIndex, true)}
                        {this.renderSection(targetIndex)}
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

const Head = styled.div`
    display: flex;
`;

const Body = styled.div`
    width: 400px;
    height: 600px;
    background-color: #5badff;
    display: flex;
    flex-direction: column;
    color: #ffffff;
`;

const Section = styled.div`
    flex: 1;
    display: flex;
    background-color: ${props => props.isInitial ? '#236bb2' : '#5badff'};
`;

function mapStateToProps(state) {
    return {
        ...exchangerSelector(state),
        ...currenciesIndexSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchanger);
