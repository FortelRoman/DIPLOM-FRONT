import React, {FC} from 'react';
import {Line} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

type TProps = {
    titles: string[],
    counts: any[],
}

const BarComponent: FC<TProps> = ({ titles, counts}) => {

    return (
        <div className='statistic__bar'>
            <Line
                height={400}
                data={{
                    labels: titles,
                    datasets: [
                        {
                            label: 'Количество записей',
                            backgroundColor: '#fefefe',
                            pointRadius: 6,
                            pointBorderColor: '#000',
                            pointBorderWidth: 3,
                            borderColor: '#333',
                            borderWidth: 2,
                            data: counts,
                            pointBackgroundColor: '#ddd',
                        }
                    ]
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio : false,
                    plugins: {
                        title: {
                            display: false,
                        },

                    }

                }}
            />
        </div>
    );
}

export default BarComponent;