import React, { Component } from "react";
import { Pie } from 'react-chartjs-2';
import {WEATHER_LST} from '../../components/constants'




export default class PieChart extends Component {
  render() {
    const weathers = (this.props?.data || []).map(e=>e.emotion)
    const counts = [0,0,0,0,0];

    for (const num of weathers) {
      counts[num] = counts[num] + 1 ;
    }
    const data = {
      labels: WEATHER_LST.map(e=>e[0]),
      datasets: [
        {
          label: 'Weather',
          data: counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(75, 192, 192, 0.2)',

            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(75, 192, 192, 1)',

            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    return (
      <React.Fragment>
         <Pie data={data} />
      </React.Fragment>
    );
  }
}
