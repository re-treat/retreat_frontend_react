import React, { Component } from "react";
import { Line } from 'react-chartjs-2';
import {WEATHER_LST} from '../../components/constants'

const options = {
  maintainAspectRatio: false,
  cubicInterpolationMode:'monotone',

  plugins:{   
    legend: { display: false
            },
      tooltip: {
              callbacks: {
                  label: function(tooltipItem, data) {
                      console.log(tooltipItem)
                      let val = tooltipItem.raw;
                      if (Number.isInteger(val)){
                        const idx = 4-parseInt(val)
                        return [0,1,2,3,4].includes(idx)? WEATHER_LST[idx][0] : '';
                      }
                      return '';
                  }
              }
      }
         
  },
  scales: {
    y: {
      ticks: {
        // For a category axis, the val is the index so the lookup via getLabelForValue is needed
        callback: function(val, index) {
          // Hide the label of every 2nd dataset\
          if (Number.isInteger(val)){
            const idx = 4-parseInt(val)
            return [0,1,2,3,4].includes(idx)? WEATHER_LST[idx][0] : '';
          }
          return ''
          
        },
        // color: 'red',
      }
    }
  },

  
};
export default class LineChart extends Component {
  
  render() {
    const data = {
      labels: (this.props?.data || []).map(e=>e.date).reverse(),
      datasets: [
        {
          
          label: 'Mood',
          data: (this.props?.data || []).map(e=>{return 4-e.emotion}).reverse(),
          fill: false,
          
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    };
    return (
      <React.Fragment>
        <Line data={data} options={options} />
      </React.Fragment>
    );
  }
}
