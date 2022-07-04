import { useParams } from "react-router-dom";

const Coin = () => {
    const { coinId } = useParams();

    return <h1>Coin: {coinId}</h1>;
};

export default Coin;
