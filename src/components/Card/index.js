// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { Currency } from '../../typeDefinitions';
import { formatNumber } from '../../helpers';

type Props = {
    currency: Currency,
    converRate?: number,
    anotherCurrencyKey?: string,
    style?: Object,
};

export default (props: Props) => {
    const { currency: { amount, key }, converRate, anotherCurrencyKey, style } = props;

    return (
        <Container style={style}>
            <Section main>
                <Item>{key}</Item>
                <Item></Item>
            </Section>
            <Section>
                <Item>You have {amount} {key}</Item>
                {
                    anotherCurrencyKey
                        ? <Item>1{key} = {formatNumber(converRate)}{anotherCurrencyKey}</Item>
                        : null
                }
            </Section>
        </Container>
    );
};

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;
`;

const Section = styled.div`
    font-size: ${props => props.main ? '2rem' : '1rem'};
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${props => props.main ? '1rem' : 0};
`;

const Item = styled.div`

`;
