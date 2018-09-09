// @flow

import { createSelector } from 'reselect';
import { create } from 'domain';

export const exchangerSelector = (state: Object) => state.exchanger;

export const currenciesIndexSelector = createSelector(
    [exchangerSelector],
    (exchangerState: Object) => {
        const { currencies, initialCurrencyKey, targetCurrencyKey } = exchangerState;
        const initialIndex = currencies.findIndex(el => el.key === initialCurrencyKey);
        const targetIndex = currencies.findIndex(el => el.key === targetCurrencyKey);

        return {
            initialIndex,
            targetIndex,
        };
    },
);
