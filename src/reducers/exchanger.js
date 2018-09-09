import actionTypes from '../actions/actionTypes';

const initialState = {
    accounts: [],
    currectCurrency: '',
    exchangeToCurrency: '',
};

export default function exchangerReducer(state = initialState, action) {
    const { type, payload } = state;

    switch (type) {
        case actionTypes.ACCNOUTS_SET:
            return {
                ...state,
                accounts: payload.accounts,
            };
        default:
            return state;
    }
}
