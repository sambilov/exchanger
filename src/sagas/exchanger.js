import { takeLatest, call } from 'redux-saga/effects';
import { getRateUrl } from '../helpers';

function* fetchCurrency(action) {
    const { payload: { currency } } = action;
    const rateUrl = getRateUrl(currency);
    const rates = yield call(fetch, rateUrl);

    
}

export default function* echangerSaga() {
    
}
