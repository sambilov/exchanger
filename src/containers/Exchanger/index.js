// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { requestCurrencies, setInitialCurrency, setTargetCurrency } from '../../actions/actionCreators';
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
};

class Exchanger extends React.Component<Props> {

    handleInitialBeforeSlide = (currentSlide: number, nextSlide: number) => {
        const { dispatch, currencies } = this.props;
        const newInitialCurrency = currencies[nextSlide];
        
        dispatch(setInitialCurrency(newInitialCurrency.key));
    };

    handleTargetBeforeSlide = (currentSlide: number, nextSlide: number) => {
        const { dispatch, currencies } = this.props;
        const newTargetCurrency = currencies[nextSlide];
        
        dispatch(setTargetCurrency(newTargetCurrency.key));
    };

    renderSection = (slideIndex: number, beforeSlideHandler: Function, isInitial: boolean = false) => {
        const { currencies } = this.props;

        return (
            <Section isInitial={isInitial}>
                <Carousel
                    wrapAround
                    beforeSlide={beforeSlideHandler}
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
        const { currencies, initialIndex, targetIndex } = this.props;

        return (
            <HorizontalContainer>
                <VerticalContainer>
                    <Body>
                        {this.renderSection(initialIndex, this.handleInitialBeforeSlide, true)}
                        {this.renderSection(targetIndex, this.handleTargetBeforeSlide)}
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
