// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { Currency } from '../../typeDefinitions';

type Props = {
    currency: Currency,
};

export default (props: Props) => {
    const { currency: { amount, key } } = props;

    return (
        <Container>
            <Section main>
                <Item>{key}</Item>
                <Item></Item>
            </Section>
            <Section>
                <Item>You have {amount}</Item>
                <Item>test</Item>
            </Section>
        </Container>
    );
};

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
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
