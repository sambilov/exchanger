import { all, takeLatest, call, put } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';
import { setCurrencies, setInitialCurrency, setTargetCurrency } from '../actions/actionCreators';
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

function* requestCurrenciesSaga() {
    const initialCurrency = currencies[0];
    const lastCurrency = currencies[currencies.length - 1];

    yield put(setCurrencies(currencies));
    yield put(setInitialCurrency(initialCurrency.key));
    yield put(setTargetCurrency(lastCurrency.key));
}   

function* fetchCurrency(action) {
    const { payload: { currency } } = action;
    const rateUrl = getRateUrl(currency);
    const rates = yield call(fetch, rateUrl);
    
}

export default function* echangerSaga() {
    yield all([
        takeLatest(actionTypes.CURRENCIES_REQUEST, requestCurrenciesSaga),
    ]);
}
