import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.txtColor};
    color: ${(props) => props.theme.bgColor};
    margin-bottom: 12px;
    border-radius: 20px;
    -webkit-box-shadow: 2px 2px 10px -2px rgba(255, 255, 255, 0.7);
    box-shadow: 2px 2px 10px -2px rgba(255, 255, 255, 0.7);
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in-out;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 52px;
    font-weight: 500;
    text-shadow: 0px 0px 5px ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 12px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

const Coins = () => {
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const res = await fetch("https://api.coinpaprika.com/v1/coins");
            const json = await res.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);

    // console.log(coins);

    return (
        <Container>
            <Header>
                <Title>Crypto Coins</Title>
            </Header>
            {loading ? (
                <Loader>Now Loading</Loader>
            ) : (
                <CoinsList>
                    {coins.map((c) => (
                        <Coin key={c.id}>
                            <Link to={`/${c.id}`}>
                                <Img
                                    src={`https://cryptocurrencyliveprices.com/img/${c.id}.png`}
                                    alt={c.symbol}
                                />
                                {c.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
};

export default Coins;
