// @flow

import { createSelector } from 'reselect';

export const exchangerSelector = (state: Object) => state.exchanger;

export const targetListSelector = createSelector(
    [exchangerSelector],
    (exchangerState: Object) => {
        const { targetCurrencyKey, currencies } = exchangerState;
        const targetIndex = currencies.findIndex(el => el.key === targetCurrencyKey);
        const targetList = [
            ...currencies.slice(targetIndex, currencies.length),
            ...currencies.slice(0, targetIndex),
        ];

        return targetList;
    },
);

export const initialListSelector = createSelector(
    [exchangerSelector],
    (exchangerState: Object) => {
        const { initialCurrencyKey, currencies } = exchangerState;
        const initialIndex = currencies.findIndex(el => el.key === initialCurrencyKey);
        const initialList = [
            ...currencies.slice(initialIndex, currencies.length),
            ...currencies.slice(0, initialIndex),
        ];

        return initialList;
    },
);
