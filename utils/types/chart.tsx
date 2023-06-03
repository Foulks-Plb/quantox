export interface pieChartProps {
    title: string;
    series: number[];
    options: OptionPieChart;
    type: 'donut' | 'pie';
    width: string
    height: string
    legendDisplay: boolean
    legendPosition?: string
}

export interface OptionPieChart {
    labels: string[];
    colors: string[];
    stroke?: any;
    legend?: any
    tooltip?: any
}
