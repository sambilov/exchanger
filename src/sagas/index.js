import { all } from 'redux-saga/effects';
import exchangerSaga from './exchanger';

export default function* rootSaga() {
    yield all([
        exchangerSaga(),
    ]);
}
