import { all, takeLatest, call, put, select, take, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import actionTypes from '../actions/actionTypes';
import { setCurrencies, setConvertCurrencies, setConvertRate, setConvertedCurrencies } from '../actions/actionCreators';
import { getRateUrl } from '../helpers';
import { exchangerSelector } from '../selectors/exchanger';

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

function* getRate(initialCurrencyKey, targetCurrencyKey) {
    const rateUrl = getRateUrl(initialCurrencyKey);
    const response = yield call(fetch, rateUrl);
    const data = yield call([response, response.json]);
    const { rates } = data;
    const rate = rates[targetCurrencyKey] || 1;

    return rate;
}

function* requestCurrencies() {
    const initialCurrency = currencies[0];
    const lastCurrency = currencies[currencies.length - 1];

    yield put(setCurrencies(currencies));
    yield put(setConvertCurrencies(initialCurrency.key, lastCurrency.key));
}   

function* fetchCurrenciesRate(action) {
    const { payload: { initialCurrencyKey, targetCurrencyKey } } = action;
    const rate = yield call(getRate, initialCurrencyKey, targetCurrencyKey);

    yield put(setConvertRate(rate));
}

function* pollCurrenciesRates() {
    while (true) {
        try {
            const {
                initialCurrency: { key: initialCurrencyKey },
                targetCurrency: { key: targetCurrencyKey },
            } = yield select(exchangerSelector);
            const rate = yield call(getRate, initialCurrencyKey, targetCurrencyKey);

            yield put(setConvertRate(rate));
        } catch (error) {
            console.log(error);
        }
        yield call(delay, 10000);
    }
}

function* pollingCurrenciesRates() {
    while (true) {
        yield take(actionTypes.CONVERT_RATE_POLLING_START);
        yield race([
            call(pollCurrenciesRates),
            take(actionTypes.CONVERT_RATE_POLLING_END),
        ]);
    }
}

function* convertation() {
    const {
        currencies,
        initialCurrency,
        targetCurrency,
        convertRate,
        convertAmount,
        initialCurrencyIndex,
        targetCurrencyIndex,
    } = yield select(exchangerSelector);
    const newCurrencies = [...currencies];

    newCurrencies[initialCurrencyIndex] = {
        ...currencies[initialCurrencyIndex],
        amount: currencies[initialCurrencyIndex].amount + convertAmount,
    };
    newCurrencies[targetCurrencyIndex] = {
        ...currencies[targetCurrencyIndex],
        amount: currencies[targetCurrencyIndex].amount - (convertAmount * convertRate)
    };

    yield put(setConvertedCurrencies(newCurrencies));
}

export default function* echangerSaga() {
    yield all([
        takeLatest(actionTypes.CURRENCIES_REQUEST, requestCurrencies),
        takeLatest(actionTypes.CONVERT_CURRENCIES_SET, fetchCurrenciesRate),
        takeLatest(actionTypes.CONVERTATION_REQUEST, convertation),
        call(pollingCurrenciesRates),
    ]);
}
