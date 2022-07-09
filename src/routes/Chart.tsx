import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
    coinName: string;
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

type ChartArray = ChartInterface[];

const Chart = ({ coinId, coinName }: ChartProps) => {
    const { isLoading, data } = useQuery<ChartArray>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId)
    );

    // JS 시간 단위 <=> Unix 시간 단위
    const closingTime = data?.map((p) =>
        new Date(p.time_close * 1000).toISOString().slice(0, -14)
    );
    const closingPrice = data?.map((p) => Number(p.close)) as number[];

    return (
        <>
            {isLoading ? (
                "Loading Chart.."
            ) : (
                <ApexChart
                    type="line"
                    series={[
                        {
                            name: `${coinName} Price`,
                            data: closingPrice,
                        },
                    ]}
                    options={{
                        chart: {
                            height: 320,
                            width: 480,
                            toolbar: { show: false },
                            background: "transparent",
                        },
                        theme: { mode: "dark" },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        grid: { show: false },
                        xaxis: {
                            axisTicks: { show: false },
                            axisBorder: { show: true },
                            labels: { show: false },
                            categories: closingTime,
                            type: "datetime",
                        },
                        yaxis: { show: false },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#ed00c5"],
                                stops: [0, 80],
                            },
                        },
                        colors: ["#00c5ed"],
                        tooltip: {
                            y: {
                                formatter: (v) => `$${v.toFixed(2)}`,
                            },
                        },
                    }}
                />
            )}
        </>
    );
};

export default Chart;
