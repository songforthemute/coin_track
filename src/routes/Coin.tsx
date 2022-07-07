import { useEffect, useState } from "react";
import {
    useParams,
    useLocation,
    Routes,
    Route,
    Link,
    useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { Container, Header, Title, Loader } from "./Coins";
import { InterfaceCoinData, InterfacePriceData } from "./CoinJsonTypes";
import Price from "./Price";
import Chart from "./Chart";

interface LocationParamsInterface {
    state: {
        name: string;
        rank: number;
    };
}

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.35);
    padding: 20px;
    border-radius: 20px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 500;
        text-transform: uppercase;
        margin-bottom: 5px;
        color: ${(props) => props.theme.accentColor};
    }
`;

const Description = styled.p`
    margin: 20px 10px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.35);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.txtColor};
    a {
        display: block;
    }
`;

// React TSX Component
function Coin() {
    const { coinId } = useParams();
    const { state } = useLocation() as LocationParamsInterface;
    const [coinData, setCoinData] = useState<InterfaceCoinData>();
    const [priceData, setPriceData] = useState<InterfacePriceData>();

    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    console.log(priceMatch, chartMatch);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const coinJson = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();

            const priceJson = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();

            setCoinData(coinJson);
            setPriceData(priceJson);

            setLoading(false);
        })();
    }, [coinId]);

    return (
        <Container>
            <Header>
                {/* home에서가 아닌, direct로 url에 접근하면 state를 부여받지 못해 가져올 수 없음 */}
                <Title>
                    {state?.name
                        ? state.name
                        : !loading
                        ? coinData?.name
                        : "Loading"}
                </Title>
            </Header>
            {loading ? (
                <Loader>Now Loading..</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank</span>
                            <span>{coinData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol</span>
                            <span>${coinData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source</span>
                            <span>{coinData?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{coinData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Supply</span>
                            <span>{priceData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply</span>
                            <span>{priceData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    {/* Link for Nested Routing */}
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>

                    {/* Nested Routing */}
                    <Routes>
                        <Route path="price" element={<Price />} />
                        <Route path="chart" element={<Chart />} />
                    </Routes>
                </>
            )}
        </Container>
    );
}

export default Coin;
