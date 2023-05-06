export interface pieChartProps {
    title: string;
    series: number[];
    options: OptionPieChart;
    type: 'donut' | 'pie';
    width: string
    height: string
}

export interface OptionPieChart {
    labels: string[];
    colors: string[];
    stroke?: any;
    legend?: any
}
