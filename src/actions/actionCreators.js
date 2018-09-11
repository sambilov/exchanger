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

export const startConverRatePolling = () => ({
    type: actionTypes.CONVERT_RATE_POLLING_START,
});

export const endConverRatePolling = () => ({
    type: actionTypes.CONVERT_RATE_POLLING_END,
});

export const setConvertAmount = (convertAmount: number) => ({
    type: actionTypes.CONVERT_AMOUNT_SET,
    payload: {
        convertAmount,
    },
});

export const requestConvertation = () => ({
    type: actionTypes.CONVERTATION_REQUEST,
});

export const setConvertedCurrencies = (currencies: Array<Currency>) => ({
    type: actionTypes.CONVERTED_CURRENCIES_SET,
    payload: {
        currencies,
    },
});

export const setError = (error: Error) => ({
    type: actionTypes.ERROR_SET,
    payload: {
        error,
    },
});
