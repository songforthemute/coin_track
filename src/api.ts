const BASE_URL = process.env.REACT_APP_COINS_SERVER;

export const fetchCoinsList = () => {
    return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

export const fetchCoinData = (coinId: string) => {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};

export const fetchPriceData = (coinId: string) => {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
};
