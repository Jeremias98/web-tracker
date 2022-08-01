import { FC } from 'react';
import { Torrent } from '../models/torrent';
import ReactECharts from 'echarts-for-react';
import { Step } from '../types/step';
import { TimeSpan } from '../interfaces/lapse';
import { Peer } from '../models/peer';

interface TorrentsTableProps {
    torrents: Torrent[],
    span: TimeSpan
}

export const BarChart: FC<TorrentsTableProps> = (props: TorrentsTableProps): JSX.Element => {
    let torrents: Torrent[] = props.torrents;
    if (!torrents || !torrents.length) return (<h5>No torrents</h5>);
    let span: TimeSpan = props.span;
    const peers: Peer[] = getPeersSorted(torrents);
    console.log(peers);
    const xAxisDates: Date[] = getHorizontalAxis(peers[0].registered, 'HOUR', span);

    const yAxisData: number[] = getVerticalAxis(peers, xAxisDates);
    const xAxisData: string[] = xAxisDates.map(date => getDateAsString(date, 'HOUR'));
    
    const option = {
      tooltip: {
        trigger: 'axis',
        position: function (pt: any) {
          return [pt[0], '10%'];
        }
      },
      toolbox: {
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxisData
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%']
      },
      series: [
        {
          name: 'New peers',
          type: 'line',
          smooth: false,
          symbol: 'none',
          areaStyle: {},
          data: yAxisData
        }
      ]
    };

    return (
        <>
            <ReactECharts option={option} />
        </>
    );
}

const getHorizontalAxis = (startDate: Date, step: Step, timeSpan: TimeSpan): Date[] => {

  let currentDate: Date = new Date(startDate);
  let data: Date[] = [];

  let unitTime: number = step === 'HOUR' ? timeSpan.hours : timeSpan.hours*60;

  [...Array(unitTime)].forEach((_, unit) => {
    let now: Date = new Date(currentDate);
    data.unshift(now);
    
    if (step === 'HOUR') currentDate.setHours(currentDate.getHours() - 1);
    else if (step === 'MINUTE') currentDate.setMinutes(currentDate.getMinutes() - 1);
  });
  
  return data;
};

const getDateAsString = (date: Date, step: Step) => {
  let dateStr: string = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/') + ' - ' + date.getHours();
  if (step ===  'MINUTE') dateStr += ':' + date.getMinutes();

  return dateStr + 'hs';
};

const getVerticalAxis = (peers: Peer[], dates: Date[]): number[] => {
  return dates.map(date => peers.filter(peer => areDatesEquals(peer.registered, date)).length);
};

const areDatesEquals = (date1: Date, date2: Date, step: Step = 'HOUR') => {
  if (step === 'HOUR') {
    return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate() &&
      date1.getHours() === date2.getHours()
  }

  return date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate() &&
      date1.getHours() === date2.getHours() &&
      date1.getMinutes() === date2.getMinutes()
}
const getPeersSorted = (torrents: Torrent[]): Peer[] => {
  return torrents.flatMap(torrent => torrent.peers).sort((a, b) => b.registered.valueOf() - a.registered.valueOf());
}