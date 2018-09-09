import config from '../config';

const { rateUrl, supportedCurrencies } = config;

export function getRateUrl(currency) {
    if (!supportedCurrencies.has(currency)) throw new Error('UNSUPPORTED_CURRENCY');

    return `${rateUrl}?base=${currency}`;
}
