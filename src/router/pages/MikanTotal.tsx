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
          id: 'apexchart-example'
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
        }
      },
      series: [
        {
          name: 'series-1',
          data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
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
