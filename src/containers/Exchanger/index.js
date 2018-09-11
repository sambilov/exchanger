// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import styled from 'styled-components';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { setConvertCurrencies, startConverRatePolling, endConverRatePolling } from '../../actions/actionCreators';
import { exchangerSelector, currenciesIndexSelector, reverseConvertRateSelector } from '../../selectors/exchanger';
import type { Currency } from '../../typeDefinitions';
import Card from '../../components/Card';
import { formatNumber } from '../../helpers';
import './index.css';

const MAIN_BACKGROUD = '#236bb2';
const AUXILARY_BACKGROUND = '#5badff';
const FONT_COLOR = '#ffffff';
const WIDTH = 400;

type Props = {
    dispatch: Dispatch<*>,
    currencies: Array<Currency>,
    initialIndex: number,
    targetIndex: number,
    initialCurrencyKey: string,
    targetCurrencyKey: string,
    convertRate: number,
    reverseConverRate: number,
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

    renderSection = (selectedItemIndex: number, isInitial: boolean = false) => {
        const { currencies, initialCurrencyKey, reverseConverRate } = this.props;

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
                            ...isInitial ? {} : {
                                anotherCurrencyKey: initialCurrencyKey,
                                converRate: reverseConverRate
                            }
                        }
                    />))}
                </Carousel>
            </Section>
        );
    };

    renderHead = () => {
        const { initialCurrencyKey, targetCurrencyKey, convertRate } = this.props;
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

    renderBody = () => {
        const { initialIndex, targetIndex } = this.props;

        return (
            <Body>
                {this.renderSection(initialIndex, true)}
                {this.renderSection(targetIndex)}
            </Body>
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
            <HorizontalWrapper>
                <VerticalWrapper>
                    <Container>
                        {this.renderHead()}
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
    width: ${WIDTH}px;
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
        reverseConverRate: reverseConvertRateSelector(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Exchanger);
