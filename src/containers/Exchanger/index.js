// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
    setConvertCurrencies,
    startConverRatePolling,
    endConverRatePolling,
    setConvertAmount,
    requestConvertation,
} from '../../actions/actionCreators';
import { exchangerSelector } from '../../selectors/exchanger';
import type { Currency } from '../../typeDefinitions';
import Card from '../../components/Card';
import { formatNumber } from '../../helpers';
import './index.css';

const MAIN_BACKGROUD = '#236bb2';
const AUXILARY_BACKGROUND = '#5badff';
const FONT_COLOR = '#ffffff';
const WIDTH = '400px';

type Props = {
    dispatch: Dispatch<*>,
    currencies: Array<Currency>,
    initialCurrencyIndex: number,
    targetCurrencyIndex: number,
    initialCurrency: Currency,
    targetCurrency: Currency,
    convertRate: number,
    reverseConvertRate: number,
    convertAmount: number,
    convertedAmount: number,
    error: ?Error,
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

    handleCarouselChange = (isInitial: boolean, slideIndex: number) => {
        console.log(slideIndex);

        const { dispatch, currencies, initialCurrency, targetCurrency } = this.props;
        const newCurrency = currencies[slideIndex];
        const newCurrencyKey = newCurrency.key;
        const newInitialCurrencyKey = isInitial ? newCurrencyKey : initialCurrency.key;
        const newTargetCurrencyKey = isInitial ? targetCurrency.key : newCurrencyKey;

        dispatch(setConvertCurrencies(newInitialCurrencyKey, newTargetCurrencyKey));
        if(isInitial) dispatch(setConvertAmount(0));
    };

    handleExchangeButtonClick = () => {
        const { dispatch } = this.props;

        dispatch(requestConvertation());
    };

    handleConvertAmountChange = (event: Event) => {
        const { dispatch } = this.props;
        const value = event.target.value;
        
        if (/^(\+|-)?(\d*|(\d+\.\d*))$/g.test(value)) {
            dispatch(setConvertAmount(value));
        }
    };

    renderSection = (selectedItemIndex: number, isInitial: boolean = false) => {
        const { currencies, initialCurrency, reverseConvertRate, convertAmount, convertedAmount } = this.props;

        return (
            <Section isInitial={isInitial}>
                <Carousel
                    style={{
                        flex: 1,
                        backgroundColor: isInitial ? MAIN_BACKGROUD : AUXILARY_BACKGROUND,
                    }}
                    width={400}
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    onChange={slideIndex => this.handleCarouselChange(isInitial, slideIndex)}
                    selectedItem={selectedItemIndex}
                >
                    {currencies.map(currency => (<Card
                        key={currency.key}
                        currency={currency}
                        {
                            ...isInitial ? {
                                handleChange: this.handleConvertAmountChange,
                                convertAmount,
                            } : {
                                anotherCurrency: {
                                    key: initialCurrency.key,
                                    convertRate: reverseConvertRate,
                                },
                                convertAmount: convertedAmount,
                            }
                        }
                    />))}
                </Carousel>
            </Section>
        );
    };

    renderHead = () => {
        const {
            initialCurrency: { key: initialCurrencyKey },
            targetCurrency: { key: targetCurrencyKey },
            convertRate,
        } = this.props;
        const sameCurrency = initialCurrencyKey === targetCurrencyKey;

        return (
            <Head>
                <Text>1{initialCurrencyKey} = {formatNumber(convertRate)}{targetCurrencyKey}</Text>
                <ExchangeButton
                    onClick={this.handleExchangeButtonClick}
                    disabled={sameCurrency}
                >Exchange</ExchangeButton>
            </Head>
        );
    };

    renderError = () => {
        const { error } = this.props;

        return (
            <Error>
                {error ? error.message : ''}
            </Error>
        );
    };

    renderBody = () => {
        const { initialCurrencyIndex, targetCurrencyIndex } = this.props;

        return (
            <Body>
                {this.renderSection(initialCurrencyIndex, true)}
                {this.renderSection(targetCurrencyIndex)}
            </Body>
        );
    };

    render() {
        const { currencies } = this.props;

        if (!currencies.length) return null;

        return (
            <HorizontalWrapper>
                <VerticalWrapper>
                    <Container>
                        {this.renderHead()}
                        {this.renderError()}
                        {this.renderBody()}
                    </Container>
                </VerticalWrapper>
            </HorizontalWrapper>
        );
    }

}

const HorizontalWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
`;

const VerticalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Container = styled.div`
    width: ${WIDTH};
    background-color: ${MAIN_BACKGROUD};
    color: ${FONT_COLOR};
`;

const Head = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    padding: 1rem;
`;

const Text = styled.div``;

const ExchangeButton = styled.button`
    position: absolute;
    right: 1rem;
    background-color: ${MAIN_BACKGROUD};
    color: ${FONT_COLOR};
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
`;

const Section = styled.div`
    flex: 1;
    display: flex;
    background-color: ${props => props.isInitial ? MAIN_BACKGROUD : AUXILARY_BACKGROUND};
`;

const Error = styled.div`
    height: 30px;
    color: red;
    display: flex;
    justify-content: center;
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
