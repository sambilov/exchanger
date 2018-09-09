import { combineReducers } from 'redux';
import exchangerReducer from './exchanger';

export default combineReducers({
    exchanger: exchangerReducer,
});
