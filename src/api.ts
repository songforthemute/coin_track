export const fetchCoinsList = () => {
    return fetch(`https://api.coinpaprika.com/v1/coins`).then((res) =>
        res.json()
    );
};

export const fetchCoinData = (coinId: string) => {
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`).then((res) =>
        res.json()
    );
};

export const fetchPriceData = (coinId: string) => {
    return fetch(
        `https://api.coinpaprika.com/v1/tickers/${coinId}/?quotes=USD`
    ).then((res) => res.json());
};

export const fetchCoinHistory = (coinId: string) => {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7;
    // const startDate = endDate - 60 * 60 * 23 ;
    // `${process.env.REACT_APP_COIN_SERVER_2}/${coinId}/ohlcv/historical/start=${startDate}&end=${endDate}`

    return fetch(
        `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}&start=${startDate}&end=${endDate}`
    ).then((res) => res.json());
};

export const fetchCoinEvents = (coinId: string) => {
    return fetch(`https://api.coinpaprika.com/v1/coins/${coinId}/events`).then(
        (res) => res.json()
    );
};
