import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { fetchCoinsList } from "../api";
import { isDarkAtom } from "../atoms";

interface InterfaceCoinList {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

export const Container = styled.div`
    padding: 0 20px;
    max-width: 480px;
    margin: 0 auto;
`;

export const Header = styled.header`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.txtColor};
    margin-bottom: 15px;
    border-radius: 20px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: all 0.25s ease-in;
        border-radius: 20px;
        -webkit-box-shadow: ${(props) => props.theme.boxShadow};
        box-shadow: ${(props) => props.theme.boxShadow};
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
            background-color: ${(props) => props.theme.bgColor};
            -webkit-box-shadow: inset ${(props) => props.theme.boxShadow};
            box-shadow: inset ${(props) => props.theme.boxShadow};
        }
    }
`;

export const Title = styled.h1`
    color: ${(props) => props.theme.accentColor};
    font-size: 48px;
    font-weight: 500;
    /* text-shadow: 0px 0px 5px ${(props) => props.theme.accentColor}; */
`;

const Img = styled.img`
    width: 30px;
    height: 30px;
    margin-right: 12px;
`;

export const Loader = styled.span`
    text-align: center;
    display: block;
`;

const ToggleBtn = styled.button`
    border: 0;
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${(props) => props.theme.txtColor};
    font-size: 24px;
    margin-left: 20px;
    border-radius: 20px;
    width: 64px;
    height: 32px;
    cursor: pointer;
    -webkit-box-shadow: inset ${(props) => props.theme.boxShadow};
    box-shadow: inset ${(props) => props.theme.boxShadow};
    transition: all 0.25s ease-in;
    &:hover {
        background-color: ${(props) => props.theme.bgColor};
    }
`;

const Coins = () => {
    // 기존 Fetch API + useState()와 로직은 비슷하지만, data cache 가능.
    const { isLoading, data } = useQuery<InterfaceCoinList[]>(
        "coinsList",
        fetchCoinsList
    );
    const coinList = data?.slice(0, 100);
    const isDark = useRecoilValue(isDarkAtom);

    const setDark = useSetRecoilState(isDarkAtom);
    const toggleDark = () => setDark((curr) => !curr);

    return (
        <Container>
            <Helmet>
                <title>Track the Coins</title>
            </Helmet>
            <Header>
                <Title>Crypto Coins</Title>
                <ToggleBtn
                    onClick={toggleDark}
                    style={isDark ? { paddingLeft: 30 } : { paddingRight: 30 }}
                >
                    {isDark ? "🌜" : "🌞"}
                </ToggleBtn>
            </Header>
            {isLoading ? (
                <Loader>Now Loading..</Loader>
            ) : (
                <CoinsList>
                    {coinList?.map((c) => (
                        <Coin key={c.id}>
                            <Link to={`/${c.id}`} state={{ name: c.name }}>
                                <Img
                                    src={`https://cryptocurrencyliveprices.com/img/${c.id}.png`}
                                    alt={c.symbol}
                                />
                                {c.name}
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
};

export default Coins;
