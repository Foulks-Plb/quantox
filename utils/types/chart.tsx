export interface pieChartProps {
    title: string;
    series: number[];
    options: OptionPieChart;
}

export interface OptionPieChart {
    labels: string[];
    colors: string[];
}
