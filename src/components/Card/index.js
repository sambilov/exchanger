// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { Currency } from '../../typeDefinitions';
import { formatNumber } from '../../helpers';

type Props = {
    currency: Currency,
    anotherCurrency?: {
        key: string,
        convertRate: number,
    },
    style?: Object,
    handleChange?: Function,
    convertAmount?: number,
};

export default (props: Props) => {
    const { currency: { amount, key }, anotherCurrency, style, handleChange, convertAmount } = props;

    return (
        <Container style={style}>
            <Section main>
                <Item>{key}</Item>
                {
                    handleChange ?
                        <Input
                            onChange={handleChange}
                            value={convertAmount || ''}
                            size={5}
                        /> :
                        <Item>{convertAmount ? formatNumber(convertAmount) : ''}</Item>
                }
            </Section>
            <Section>
                <Item>You have {amount} {key}</Item>
                {
                    anotherCurrency
                        ? <Item>1{key} = {formatNumber(anotherCurrency.convertRate)}{anotherCurrency.key}</Item>
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
    align-items: center;
    margin-bottom: ${props => props.main ? '1rem' : 0};
`;

const Item = styled.div``;

const Input = styled.input`
    background-color: transparent;
    border: 1px solid #ffffff;
    font-size: 2rem;
    color: #ffffff;
`;
