import { OptionPieChart, pieChartProps } from '@/utils/types/chart';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PieChart({ series, options, title }: pieChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [seriesSort, setSeriesSort] = useState<number[]>();
  const [optionsSort, setOptionsSort] = useState<OptionPieChart>();

  useEffect(() => {
    if (isMounted) {
      initChart();
    } else {
      setIsMounted(true);
    }
  }, [isMounted]);

  function initChart() {
    const aggregatedData: any = {};

    for (let i = 0; i < options.labels.length; i++) {
      const label = options.labels[i];
      if (aggregatedData[label]) {
        aggregatedData[label] += series[i];
      } else {
        aggregatedData[label] = series[i];
      }
    }

    const resultSeries: number[] = Object.values(aggregatedData);
    const resultLabels: string[] = Object.keys(aggregatedData);

    setSeriesSort(resultSeries);
    setOptionsSort({ labels: resultLabels, colors: options.colors });
  }

  if (!seriesSort || !optionsSort) return <div></div>;
  return (
    <div id="chart">
      <p className="h3 text-center">{title}</p>
      {seriesSort.length !== 0 ? (
        <div>
          <Chart
            series={seriesSort}
            options={optionsSort}
            type="pie"
            width={400}
          />
        </div>
      ) : (
        <p className="text-center">No data</p>
      )}
    </div>
  );
}
