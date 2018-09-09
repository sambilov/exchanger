import actionTypes from './actionTypes';

export const setAccounts = (accounts) => ({
    type: actionTypes.ACCNOUTS_SET,
    payload: {
        accounts,
    },
});