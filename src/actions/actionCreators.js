// @flow

import actionTypes from './actionTypes';
import type { Currency } from '../typeDefinitions';

export const requestCurrencies = () => ({
    type: actionTypes.CURRENCIES_REQUEST,
});

export const setCurrencies = (currencies: Array<Currency>) => ({
    type: actionTypes.CURRENCIES_SET,
    payload: {
        currencies,
    },
});

export const setInitialCurrency = (key: string) => ({
    type: actionTypes.INITIAL_CURRENCY_SET,
    payload: {
        key,
    },
});

export const setTargetCurrency = (key: string) => ({
    type: actionTypes.TARGET_CURRENCY_SET,
    payload: {
        key,
    },
});
