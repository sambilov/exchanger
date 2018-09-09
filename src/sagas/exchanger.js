import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';
import { setCurrencies, setConvertCurrencies, setConvertRate } from '../actions/actionCreators';
import { getRateUrl } from '../helpers';

const currencies = [
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
];

async function getRate(initialCurrencyKey, targetCurrencyKey) {
    const rateUrl = getRateUrl(initialCurrencyKey);
    const response = await fetch(rateUrl);
    const data = await response.json();
    const { rates } = data;
    const rate = rates[targetCurrencyKey] || 1;

    return rate;
}

function* requestCurrenciesSaga() {
    const initialCurrency = currencies[0];
    const lastCurrency = currencies[currencies.length - 1];

    yield put(setCurrencies(currencies));
    yield put(setConvertCurrencies(initialCurrency.key, lastCurrency.key));
}   

function* fetchCurrenciesRateSaga(action) {
    const { payload: { initialCurrencyKey, targetCurrencyKey } } = action;
    const rate = yield getRate(initialCurrencyKey, targetCurrencyKey);

    yield put(setConvertRate(rate));
}

export default function* echangerSaga() {
    yield all([
        takeLatest(actionTypes.CURRENCIES_REQUEST, requestCurrenciesSaga),
        takeLatest(actionTypes.CONVERT_CURRENCIES_SET, fetchCurrenciesRateSaga),
    ]);
}
