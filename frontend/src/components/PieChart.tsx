import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

interface PieChartProps {
    team1Share: number;
    team2Share: number;
}

const PieChart: React.FC<PieChartProps> = ({ team1Share, team2Share }) => {
    const total = team1Share + team2Share;

    const data = {
        labels: ['Team 1', 'Team 2'],
        datasets: [
            {
                data: [team1Share, team2Share],
                backgroundColor: ['#979797', '#147AD6'],
                borderWidth: 0,
            },
        ],
    };

    const options: ChartOptions<'pie'> = {
        plugins: {
            legend: {
                display: false,
            },
            datalabels: {
                color: '#fff',
                formatter: (value: number) => {
                    const percentage = (value / total) * 100;
                    return `${percentage.toFixed(1)}%`;
                },
                font: {
                    weight: 'bold',
                    size: 14,
                },
            },
        },
    };

    return (
        <div className="w-full max-w-xs mx-auto">
            <Pie data={data} options={options} plugins={[ChartDataLabels]} />
        </div>
    );
};

export default PieChart;
