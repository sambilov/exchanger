const initialState = {
    accounts: [],
    exchangeFrom: '',
    exchangeTo: '',
};

export default function exchangerReducer(state = initialState, action) {
    const { type, payload } = state;

    switch (type) {
        default:
            return state;
    }
}
