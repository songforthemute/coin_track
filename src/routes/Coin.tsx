import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Container, Header, Title, Loader } from "./Coins";
import { CoinDataInterface, PriceDataInterface } from "./CoinJsonTypes";

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

function Coin() {
    const { coinId } = useParams();
    const { state } = useLocation() as LocationParamsInterface;
    const [coinData, setCoinData] = useState<CoinDataInterface>();
    const [priceData, setPriceData] = useState<PriceDataInterface>();
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
                </>
            )}
        </Container>
    );
}

export default Coin;
