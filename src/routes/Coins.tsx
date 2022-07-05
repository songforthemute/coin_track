import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    padding: 0 20px;
`;

const Header = styled.header`
    height: 10vh;
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
    font-size: 56px;
`;

const coins = [
    {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: 1,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "eth-ethereum",
        name: "Ethereum",
        symbol: "ETH",
        rank: 2,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "hex-hex",
        name: "HEX",
        symbol: "HEX",
        rank: 3,
        is_new: false,
        is_active: true,
        type: "token",
    },
];

const Coins = () => {
    return (
        <Container>
            <Header>
                <Title>All thing of Coins</Title>
            </Header>
            <CoinsList>
                {coins.map((c) => (
                    <Coin key={c.id}>
                        <Link to={`/${c.id}`}>{c.name} &rarr;</Link>
                    </Coin>
                ))}
            </CoinsList>
        </Container>
    );
};

export default Coins;
