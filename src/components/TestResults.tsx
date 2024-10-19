import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TestResultsProps {
  result: {
    type: string;
    data: {
      [key: string]: number;
    };
  };
}

const TestResults: React.FC<TestResultsProps> = ({ result }) => {
  const chartData = {
    labels: Object.keys(result.data),
    datasets: [
      {
        label: result.type,
        data: Object.values(result.data),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `${result.type} Analysis Results`,
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-semibold mb-4">Test Results: {result.type}</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TestResults;