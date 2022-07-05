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
    margin-bottom: 10px;
    border-radius: 20px;
    -webkit-box-shadow: 5px 5px 5px 2px rgba(255, 255, 255, 0.2);
    box-shadow: 5px 5px 5px 2px rgba(255, 255, 255, 0.2);
    a {
        transition: color 0.2s ease-in-out;
        display: block;
        padding: 20px;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
    font-weight: 500;
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

    console.log(coins);

    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {loading ? (
                <Loader>Now Loading</Loader>
            ) : (
                <CoinsList>
                    {coins.map((c) => (
                        <Coin key={c.id}>
                            <Link to={`/${c.id}`}>{c.name} &rarr;</Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
};

export default Coins;
