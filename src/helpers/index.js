import config from '../config';

const { rateUrl, supportedCurrencies } = config;

export function getRateUrl(currency) {
    if (!supportedCurrencies.has(currency)) throw new Error('UNSUPPORTED_CURRENCY');

    return `${rateUrl}?base=${currency}`;
}

export function formatNumber(number: number, mantissaLength: number = 3) {
    const formatted = number.toFixed(mantissaLength);

    return formatted;
}
