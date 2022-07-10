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
import { useQuery } from "react-query";
import { fetchCoinData, fetchPriceData } from "../api";
import { Helmet } from "react-helmet";
import Events from "./Events";

interface InterfaceLocationParams {
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

export const Tabs = styled.div<{ columns: string }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

export const Tab = styled.span<{ isActive: boolean }>`
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

const Footer = styled.footer`
    margin: 20px auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Btn = styled.button`
    cursor: pointer;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 20px;
    color: ${(props) => props.theme.txtColor};
    font-size: 18px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: color 0.35s ease-in-out;
    &:hover,
    &:focus {
        color: ${(props) => props.theme.accentColor};
    }
`;

// React TSX Component
function Coin() {
    const { coinId } = useParams();
    const { state } = useLocation() as InterfaceLocationParams;

    const { isLoading: coinLoading, data: coinData } =
        useQuery<InterfaceCoinData>(["coin", coinId!], () =>
            fetchCoinData(coinId!)
        );
    const { isLoading: priceLoading, data: priceData } =
        useQuery<InterfacePriceData>(
            ["price", coinId!],
            () => fetchPriceData(coinId!),
            { refetchInterval: 60000 }
        );

    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const eventsMatch = useMatch("/:coinId/events");

    const loading = coinLoading || priceLoading;

    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name
                        ? state.name
                        : !loading
                        ? coinData?.name
                        : "Loading"}
                </title>
            </Helmet>
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
                            <span>Price</span>
                            <span>
                                ${priceData?.quotes.USD.price.toFixed(2)}
                            </span>
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
                    <Tabs columns="3">
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                        <Tab isActive={eventsMatch !== null}>
                            <Link to={`/${coinId}/events`}>Events</Link>
                        </Tab>
                    </Tabs>

                    {/* Nested Routing */}
                    <Routes>
                        <Route
                            path="price"
                            element={<Price priceData={priceData!} />}
                        />
                        <Route
                            path="chart"
                            element={
                                <Chart
                                    coinId={coinId!}
                                    coinName={coinData!.name}
                                />
                            }
                        />
                        <Route
                            path="events"
                            element={<Events coinId={coinId!} />}
                        />
                    </Routes>
                </>
            )}
            <Footer>
                <Link to="/">
                    <Btn>&larr;</Btn>
                </Link>
            </Footer>
        </Container>
    );
}

export default Coin;
