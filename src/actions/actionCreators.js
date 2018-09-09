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

export const setConvertCurrencies = (initialCurrencyKey: string, targetCurrencyKey: string) => ({
    type: actionTypes.CONVERT_CURRENCIES_SET,
    payload: {
        initialCurrencyKey,
        targetCurrencyKey,
    },
});

export const setConvertRate = (convertRate: number) => ({
    type: actionTypes.CONVERT_RATE_SET,
    payload: {
        convertRate,
    }
});
