// @flow

import { createSelector } from 'reselect';
import { create } from 'domain';

export const baseSelector = (state: Object) => state.exchanger;

export const exchangerSelector = createSelector(
    [baseSelector],
    (exchangerState: Object) => {
        const {
            currencies,
            initialCurrencyKey,
            targetCurrencyKey,
            convertRate,
            convertAmount,
            error,
        } = exchangerState;
        const initialCurrencyIndex = currencies.findIndex(el => el.key === initialCurrencyKey);
        const targetCurrencyIndex = currencies.findIndex(el => el.key === targetCurrencyKey);
        const initialCurrency = currencies[initialCurrencyIndex];
        const targetCurrency = currencies[targetCurrencyIndex];
        const reverseConvertRate = 1/convertRate;
        const numericConvertAmount = parseFloat(convertAmount) || parseFloat(convertAmount + '0');
        const convertedAmount = numericConvertAmount * convertRate * -1;

        return {
            currencies,
            initialCurrencyIndex,
            targetCurrencyIndex,
            initialCurrency,
            targetCurrency,
            convertRate,
            reverseConvertRate,
            convertAmount,
            numericConvertAmount,
            convertedAmount,
            error,
        };
    },
);
