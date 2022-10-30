import { Component } from 'react'
import '@/styles/App.css'
import '@/services/auth/firebase'
import Chart from 'react-apexcharts'
import styled from '@emotion/styled'

interface DatabaseMikan {
  userId: string
  data: {
    taste: number
    texture: number
  }
}

interface DatabaseAllMikan {
  name: string
  data: DatabaseMikan[]
}

const testData01: DatabaseAllMikan = {
  name: 'cut_fruit_orange',
  data: [
    {
      userId: 'person1',
      data: {
        taste: 5,
        texture: 5
      }
    }
  ]
}

const testData02: DatabaseAllMikan = {
  name: 'fruit_ao_mikan',
  data: [
    {
      userId: 'person1',
      data: {
        taste: -5,
        texture: -5
      }
    }
  ]
}

const testData03: DatabaseAllMikan = {
  name: 'fruit_cut_orange',
  data: [
    {
      userId: 'person1',
      data: {
        taste: 2,
        texture: 1
      }
    },
    {
      userId: 'person2',
      data: {
        taste: 1,
        texture: 1
      }
    },
    {
      userId: 'person3',
      data: {
        taste: 3,
        texture: 3
      }
    },
    {
      userId: 'person4',
      data: {
        taste: 4,
        texture: -1
      }
    },
    {
      userId: 'person5',
      data: {
        taste: -3,
        texture: 2
      }
    }
  ]
}

const CALC_REVIEW_AVERAGE = (inputList: DatabaseMikan[]): [number, number] => {
  const tastes = inputList.map((obj) => obj.data.taste)
  const averageTaste = tastes.reduce((a, b) => a + b, 0) / tastes.length
  const textures = inputList.map((obj) => obj.data.texture)
  const averageTexture = textures.reduce((a, b) => a + b, 0) / textures.length
  return [averageTaste, averageTexture]
}

export class MikanTotal extends Component<{}, { options: any; series: any }> {
  constructor(props: any) {
    super(props)
    this.state = {
      options: {
        chart: {
          height: 480,
          type: 'scatter',
          animations: {
            enabled: true
          },
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
        },
        fill: {
          type: 'image',
          opacity: 0.8,
          image: {
            src: [
              'https://github.com/tofuchic/kancolle/raw/main/public/mikan/cut_fruit_orange.png',
              'https://github.com/tofuchic/kancolle/raw/main/public/mikan/fruit_ao_mikan.png',
              'https://github.com/tofuchic/kancolle/raw/main/public/mikan/fruit_cut_orange.png'
            ],
            width: 20,
            height: 20
          }
        },
        grid: {
          xaxis: {
            lines: {
              show: true
            }
          },
          yaxis: {
            lines: {
              show: true
            }
          }
        },
        legend: {
          show: false
        },
        markers: {
          size: 10
        },
        tooltip: {
          theme: 'dark',
          custom: ({ seriesIndex, w }: any) => {
            const data = w.globals.initialSeries[seriesIndex]
            return data.name
          }
        },
        xaxis: {
          type: 'numeric',
          tickAmount: 10,
          min: -5,
          max: 5,
          axisBorder: {
            show: true,
            color: '#78909C',
            height: 1,
            width: '100%',
            offsetX: 0,
            offsetY: 0
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            height: 4,
            offsetX: 0,
            offsetY: 0
          }
        },
        yaxis: {
          tickAmount: 10,
          min: -5.0,
          max: 5.0,
          axisBorder: {
            show: true,
            color: '#78909C',
            height: '100%',
            width: 1,
            offsetX: 0,
            offsetY: 0
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: '#78909C',
            width: 4,
            offsetX: -0,
            offsetY: 0
          }
        }
      },
      series: [
        {
          name: testData01.name,
          type: 'scatter',
          data: [CALC_REVIEW_AVERAGE(testData01.data)]
        },
        {
          name: testData02.name,
          type: 'scatter',
          data: [CALC_REVIEW_AVERAGE(testData02.data)]
        },
        {
          name: testData03.name,
          type: 'scatter',
          data: [CALC_REVIEW_AVERAGE(testData03.data)]
        }
      ]
    }
  }

  render(): JSX.Element {
    return (
      <TateWrapper>
        <YokoWrapper>
          <Column>とろとろ</Column>
        </YokoWrapper>
        <YokoWrapper>
          <Column>酸っぱい</Column>
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="scatter"
            width={480}
            height={480}
          />
          <Column>甘い</Column>
        </YokoWrapper>
        <YokoWrapper>
          <Column>しゃきしゃき</Column>
        </YokoWrapper>
      </TateWrapper>
    )
  }
}

const TateWrapper = styled.section`
  align-items: center;
  width: 720px;
`

const YokoWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Column = styled.span`
  margin-left: 24px;
  margin-right: 24px;
  width: 100px;
  display: block;
  text-align: center;
`
