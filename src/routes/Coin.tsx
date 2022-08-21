import {
    useParams,
    useLocation,
    Routes,
    Route,
    Link,
    useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { Container, Header, Title } from "./Coins";
import { InterfaceCoinData, InterfacePriceData } from "./CoinJsonTypes";
import Price from "./Price";
import Chart from "./Chart";
import { useQuery } from "react-query";
import { fetchCoinData, fetchPriceData } from "../api";
import { Helmet } from "react-helmet";
import Events from "./Events";
import Loading from "../Loading";

interface InterfaceLocationParams {
    state: {
        name: string;
        rank: number;
    };
}

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: ${(prop) => prop.theme.cardBgColor};
    padding: 20px;
    border-radius: 20px;
    -webkit-box-shadow: ${(props) => props.theme.boxShadow};
    box-shadow: ${(props) => props.theme.boxShadow};
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 767px) {
        font-size: 10px;
    }
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
    @media screen and (max-width: 767px) {
        font-size: 12px;
    }
`;

export const Tabs = styled.div<{ columns: string }>`
    display: grid;
    grid-template-columns: repeat(${(props) => props.columns}, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

export const Tab = styled.div<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 500;
    background-color: ${(props) =>
        props.isActive ? props.theme.bgColor : props.theme.cardBgColor};
    padding: 7px 0px;
    border-radius: 20px;
    -webkit-box-shadow: ${(props) =>
        props.isActive
            ? `inset ${props.theme.boxShadow}`
            : `${props.theme.boxShadow}`};
    box-shadow: ${(props) =>
        props.isActive
            ? `inset ${props.theme.boxShadow}`
            : `${props.theme.boxShadow}`};
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.txtColor};
    transition: all 0.25s ease-in;
    &:hover,
    &:focus {
        background-color: ${(props) => props.theme.bgColor};
        -webkit-box-shadow: inset ${(props) => props.theme.boxShadow};
        box-shadow: inset ${(props) => props.theme.boxShadow};
    }
    @media screen and (max-width: 767px) {
        font-size: 10px;
    }
`;

const Footer = styled.footer`
    margin: 25px auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;

const Btn = styled.button`
    cursor: pointer;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 25px;
    color: ${(props) => props.theme.txtColor};
    font-size: 18px;
    background-color: ${(props) => props.theme.cardBgColor};
    transition: all 0.25s ease-in;
    -webkit-box-shadow: ${(props) => props.theme.boxShadow};
    box-shadow: ${(props) => props.theme.boxShadow};
    &:hover,
    &:focus {
        background-color: ${(props) => props.theme.bgColor};
        -webkit-box-shadow: inset ${(props) => props.theme.boxShadow};
        box-shadow: inset ${(props) => props.theme.boxShadow};
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
                <Loading />
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
                                ${priceData?.quotes?.USD?.price.toFixed(2)}
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
                        <OverviewItem>
                            <span>Market Cap</span>
                            <span>{priceData?.quotes?.USD?.market_cap}</span>
                        </OverviewItem>
                    </Overview>

                    {/* Link for Nested Routing */}
                    <Tabs columns="3">
                        <Link to={`/${coinId}/chart`}>
                            <Tab isActive={chartMatch !== null}>Chart</Tab>
                        </Link>
                        <Link to={`/${coinId}/price`}>
                            <Tab isActive={priceMatch !== null}>Price</Tab>
                        </Link>
                        <Link to={`/${coinId}/events`}>
                            <Tab isActive={eventsMatch !== null}>Events</Tab>
                        </Link>
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

                    {/* Go to Back */}
                    <Footer>
                        <Link to={`/`}>
                            <Btn>&larr;</Btn>
                        </Link>
                    </Footer>
                </>
            )}
        </Container>
    );
}

export default Coin;
