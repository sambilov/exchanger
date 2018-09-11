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

const MAIN_BACKGROUD = '#236bb2';
const AUXILARY_BACKGROUND = '#5badff';
const FONT_COLOR = '#ffffff';

type Props = {
    dispatch: Dispatch<*>,
    currencies: Array<Currency>,
    initialIndex: number,
    targetIndex: number,
    initialCurrencyKey: string,
    targetCurrencyKey: string,
    convertRate: number,
    sameCurrency: boolean,
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

    handleExchangeButtonClick = () => {
        console.log('clicked');
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
        const {
            currencies,
            initialIndex,
            targetIndex,
            initialCurrencyKey,
            targetCurrencyKey,
            convertRate
        } = this.props;
        const sameCurrency = initialCurrencyKey === targetCurrencyKey;

        return (
            <HorizontalContainer>
                <VerticalContainer>
                    <Head>
                        <Text>1{initialCurrencyKey} = {convertRate}{targetCurrencyKey}</Text>
                        <ExchangeButton
                            onClick={this.handleExchangeButtonClick}
                            disabled={sameCurrency}
                        >Exchange</ExchangeButton>
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
    position: relative;
    display: flex;
    justify-content: center;
    padding: 1rem;
    background-color: ${MAIN_BACKGROUD};
    color: ${FONT_COLOR};
`;

const Text = styled.div``;

const ExchangeButton = styled.button`
    position: absolute;
    right: 1rem;
    background-color: ${MAIN_BACKGROUD};
    color: ${FONT_COLOR};
`;

const Body = styled.div`
    width: 400px;
    height: 600px;
    display: flex;
    flex-direction: column;
    background-color: ${MAIN_BACKGROUD};
    color: ${FONT_COLOR};
`;

const Section = styled.div`
    flex: 1;
    display: flex;
    background-color: ${props => props.isInitial ? MAIN_BACKGROUD : AUXILARY_BACKGROUND};
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
