export const fetchCoinsList = () => {
    return fetch(`${process.env.REACT_APP_COINS_SERVER}/coins`).then((res) =>
        res.json()
    );
};

export const fetchCoinData = (coinId: string) => {
    return fetch(`${process.env.REACT_APP_COINS_SERVER}/coins/${coinId}`).then(
        (res) => res.json()
    );
};

export const fetchPriceData = (coinId: string) => {
    return fetch(
        `${process.env.REACT_APP_COINS_SERVER}/tickers/${coinId}/?quotes=USD`
    ).then((res) => res.json());
};

export const fetchCoinHistory = (coinId: string) => {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 24 * 7;
    // const startDate = endDate - 60 * 60 * 23 ;
    // `${process.env.REACT_APP_COIN_SERVER_2}/${coinId}/ohlcv/historical/start=${startDate}&end=${endDate}`

    return fetch(
        `${process.env.REACT_APP_COIN_SERVER}/?coinId=${coinId}&start=${startDate}&end=${endDate}`
    ).then((res) => res.json());
};

export const fetchCoinEvents = (coinId: string) => {
    return fetch(
        `${process.env.REACT_APP_COINS_SERVER}/coins/${coinId}/events`
    ).then((res) => res.json());
};
