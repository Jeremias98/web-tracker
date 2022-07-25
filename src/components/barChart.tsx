import { FC } from 'react';
import { Torrent } from '../models/torrent';
import ReactECharts from 'echarts-for-react';

interface TorrentsTableProps {
    torrents: Torrent[]
}

export const BarChart: FC<TorrentsTableProps> = (props: TorrentsTableProps): JSX.Element => {
    let torrents: Torrent[] = props.torrents;

    const option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      };

    return (
        <>
            <ReactECharts option={option} />
        </>
    );
}