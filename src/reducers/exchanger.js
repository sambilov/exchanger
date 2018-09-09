// @flow

import actionTypes from '../actions/actionTypes';
import type { Currency } from '../typeDefinitions';

type State = {
    currencies: Array<Currency>,
    initialCurrencyKey: string,
    targetCurrencyKey: string,
};

const initialState = {
    currencies: [],
    initialCurrencyKey: '',
    targetCurrencyKey: '',
};

export default function exchangerReducer(state: State = initialState, action: Object) {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.CURRENCIES_SET:
            return {
                ...state,
                currencies: payload.currencies
            };
        case actionTypes.INITIAL_CURRENCY_SET:
            return {
                ...state,
                initialCurrencyKey: payload.key,
            };
        case actionTypes.TARGET_CURRENCY_SET:
            return {
                ...state,
                targetCurrencyKey: payload.key,
            };
        default:
            return state;
    }
}
