import { OptionPieChart, pieChartProps } from '@/utils/types/chart';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import styles from './piechart.module.scss';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function PieChart({ title, series, options, type, width, height }: pieChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [seriesSort, setSeriesSort] = useState<number[]>();
  const [optionsSort, setOptionsSort] = useState<OptionPieChart>();

  useEffect(() => {
    if (isMounted) {
      initChart();
    } else {
      setIsMounted(true);
    }
  }, [isMounted, series]);

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
    setOptionsSort({ labels: resultLabels, colors: options.colors, stroke: { show: false }, legend: { position: 'bottom'}});
  }

  if (!seriesSort || !optionsSort) return <div></div>;
  return (
    <div className={styles.pieChart}>
      <div className={styles.pieTitle}>{title}</div>
      {seriesSort.length !== 0 ? (
        <div className=' '>
          <Chart
            series={seriesSort}
            options={optionsSort}
            type={type}
            width={width}
            height={height}
          />
        </div>
      ) : (
        <p className="text-center">No data</p>
      )}
    </div>
  );
}
