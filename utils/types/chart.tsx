export interface pieChartProps {
    title: string;
    series: number[];
    options: OptionPieChart;
    type: 'donut' | 'pie';
    width: string
}

export interface OptionPieChart {
    labels: string[];
    colors: string[];
    stroke?: any
}
