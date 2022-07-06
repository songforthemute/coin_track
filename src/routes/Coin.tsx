import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Container, Header, Title, Loader } from "./Coins";

interface LocationParams {
    state: {
        name: string;
        rank: number;
    };
}

function Coin() {
    const { coinId } = useParams();
    const { state } = useLocation() as LocationParams;
    const [coinData, setCoinData] = useState({});
    const [priceData, setPriceData] = useState({});
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
    }, []);

    return (
        <Container>
            <Header>
                {/* home에서가 아닌, direct로 url에 접근하면 state를 부여받지 못해 가져올 수 없음 */}
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? <Loader>Now Loading</Loader> : null}
        </Container>
    );
}

export default Coin;
