import { Component } from 'react'
import '@/styles/App.css'
import '@/services/auth/firebase'
import Chart from 'react-apexcharts'

export class MikanTotal extends Component<{}, { options: any; series: any }> {
  constructor(props: any) {
    super(props)
    this.state = {
      options: {
        chart: {
          height: 350,
          type: 'scatter',
          animations: {
            enabled: false
          },
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#056BF6', '#D2376A'],
        xaxis: {
          tickAmount: 10,
          min: 0,
          max: 40
        },
        yaxis: {
          tickAmount: 7
        },
        markers: {
          size: 20
        },
        fill: {
          type: 'image',
          opacity: 1,
          image: {
            src: [
              '../../assets/images/ico-messenger.png',
              '../../assets/images/ico-instagram.png'
            ],
            width: 40,
            height: 40
          }
        },
        legend: {
          labels: {
            useSeriesColors: true
          },
          markers: {
            customHTML: [
              function () {
                return ''
              },
              function () {
                return ''
              }
            ]
          }
        }
      },
      series: [
        {
          name: 'mikan_a',
          data: [16.4, 5.4]
        },
        {
          name: 'mikan_b',
          data: [10.4, -5.4]
        }
      ]
    }
  }

  render(): JSX.Element {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width={500}
        height={320}
      />
    )
  }
}
