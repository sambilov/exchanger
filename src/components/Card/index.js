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
            {`${key} ${amount}`}
        </Container>
    );
};

const Container = styled.div``;
