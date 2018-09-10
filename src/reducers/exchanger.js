// @flow

import actionTypes from '../actions/actionTypes';
import type { Currency } from '../typeDefinitions';

type State = {
    currencies: Array<Currency>,
    initialCurrencyKey: string,
    targetCurrencyKey: string,
    convertRate: number,
};

const initialState = {
    currencies: [],
    initialCurrencyKey: '',
    targetCurrencyKey: '',
    convertRate: 1,
};

export default function exchangerReducer(state: State = initialState, action: Object) {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.CURRENCIES_SET:
        case actionTypes.CONVERT_CURRENCIES_SET:
        case actionTypes.CONVERT_RATE_SET:
            return {
                ...state,
                ...payload,
            };
        default:
            return state;
    }
}
