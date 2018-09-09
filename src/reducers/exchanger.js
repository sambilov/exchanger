// @flow

import actionTypes from '../actions/actionTypes';

type Currency = {
    key: string,
    amount: number,
};

type State = {
    currencies: Array<Currency>,
    currectCurrencyKey: string,
    exchangeToCurrencyKey: string,
};

const initialState = {
    currencies: [],
    currectCurrencyKey: '',
    exchangeToCurrencyKey: '',
};

export default function exchangerReducer(state: State = initialState, action: Object) {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.CURRENCIES_SET:
            return {
                ...state,
                currencies: [
                    {
                        key: 'EUR',
                        amount: 100,
                    },
                    {
                        key: 'GBP',
                        amount: 200,
                    },
                    {
                        key: 'USD',
                        amount: 300,
                    },
                ],
            };
        default:
            return state;
    }
}
