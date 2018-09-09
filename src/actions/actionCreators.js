import actionTypes from './actionTypes';

export const requestCurrencies = () => ({
    type: actionTypes.CURRENCIES_REQUEST,
});

export const setCurrencies = (currencies) => ({
    type: actionTypes.CURRENCIES_SET,
    payload: {
        currencies,
    },
});