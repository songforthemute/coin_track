import { useState } from "react";
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
    const [loading, setLoading] = useState(true);

    console.log(state);

    return (
        <Container>
            <Header>
                {/* direct로 접근하면 state를 부여받지 못해 가져올 수 없음 */}
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? <Loader>Now Loading</Loader> : null}
        </Container>
    );
}

export default Coin;
