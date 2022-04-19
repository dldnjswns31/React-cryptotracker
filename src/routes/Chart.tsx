import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atom";

interface IChartProps {
  coinId: string;
}

interface IData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: IChartProps) {
  const { isLoading, data } = useQuery<IData[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        // <ApexChart
        //   type="line"
        //   series={[
        //     {
        //       name: "Price",
        //       data: data?.map((price) => price.close) ?? [],
        //     },
        //   ]}
        //   options={{
        //     theme: { mode: "dark" },
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: { show: false },
        //       background: "transparent",
        //     },
        //     stroke: { curve: "smooth", width: 5 },
        //     grid: { show: false },
        //     yaxis: { show: false },
        //     xaxis: {
        //       labels: {
        //         show: false,
        //       },
        //       axisTicks: {
        //         show: false,
        //       },
        //       axisBorder: {
        //         show: false,
        //       },
        //       categories: data?.map((price) => price.time_close),
        //       type: "datetime",
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
        //     },
        //     colors: ["#0fbcf9"],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `$ ${value.toFixed(3)}`,
        //       },
        //     },
        //   }}
        // />

        <ApexChart
          type="candlestick"
          series={[
            {
              // OHCL
              data:
                data?.map((price) => ({
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close].map(
                    (value) => value.toFixed(2)
                  ),
                })) ?? [],
            },
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              // background: "transparent",
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              categories: data?.map((price) => price.time_close),
              type: "datetime",
            },
            // tooltip: {
            //   y: {
            //     formatter: (value) => `$ ${value.toFixed(3)}`,
            //   },
            // },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
