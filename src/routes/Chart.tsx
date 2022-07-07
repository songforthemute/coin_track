import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";

interface ChartProps {
    coinId: string;
}

interface ChartInterface {
    close: string;
    high: string;
    low: string;
    market_cap: number;
    open: string;
    time_close: number;
    time_open: number;
    volume: string;
}

type ChartMapArray = ChartInterface[];

const Chart = ({ coinId }: ChartProps) => {
    const { isLoading, data } = useQuery<ChartMapArray>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId)
    );


    return (
        <>
        </>
    );
};

export default Chart;
