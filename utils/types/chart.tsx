export interface pieChartProps {
    title: string;
    series: number[];
    options: OptionPieChart;
    type: 'donut' | 'pie';
}

export interface OptionPieChart {
    labels: string[];
    colors: string[];
}
