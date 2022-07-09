import { InterfacePriceData } from "./CoinJsonTypes";

interface PriceProps {
    coinId: string;
    priceData: InterfacePriceData;
}

const Price = ({ coinId, priceData }: PriceProps) => {
    console.log(priceData);

    return <h1>Price</h1>;
};

export default Price;
