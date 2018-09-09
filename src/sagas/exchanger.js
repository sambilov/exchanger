import { all, takeLatest, call, put } from 'redux-saga/effects';
import actionTypes from '../actions/actionTypes';
import { setCurrencies } from '../actions/actionCreators';
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
    yield put(setCurrencies(currencies));
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
