import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import Loading from "../Loading";

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
    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery<ChartArray>(["ohlcv", coinId], () =>
        fetchCoinHistory(coinId)
    );

    console.log(data);

    // JS 시간 단위 <=> Unix 시간 단위
    const closingTime = data?.map((p) =>
        new Date(p.time_close * 1000).toISOString().slice(0, -14)
    );
    const yAxis = data?.map((p) => ({
        x: new Date(p.time_close * 1000).toISOString().slice(0, -14),
        y: [Number(p.open), Number(p.high), Number(p.low), Number(p.close)],
    }));

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <ApexChart
                    type="candlestick"
                    series={[
                        {
                            data: yAxis!,
                        },
                    ]}
                    options={{
                        chart: {
                            type: "candlestick",
                            height: 320,
                            width: 480,
                            toolbar: { show: false },
                            background: "transparent",
                        },
                        theme: { mode: isDark ? "dark" : "light" },
                        stroke: {
                            lineCap: "round",
                            curve: "smooth",
                            width: 2,
                        },
                        grid: {
                            show: true,
                            borderColor: isDark
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)",
                        },
                        xaxis: {
                            axisTicks: { show: false },
                            axisBorder: { show: true },
                            labels: { show: true },
                            categories: closingTime,
                            type: "datetime",
                        },
                        yaxis: { show: false },
                        fill: {
                            type: "solid",
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: "#f356d0",
                                    downward: "#4fd7f6",
                                },
                            },
                        },
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
