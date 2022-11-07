import { useEffect, useState } from 'react'
import '@/styles/App.css'
import Chart from 'react-apexcharts'
import styled from '@emotion/styled'
import { MikanDetail } from './MikanDetail'
import { collectionGroup, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '@/services/auth/firebase'
import { IconButton } from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import useLocalStorage from '@/hooks/useLocalStorage'

interface DatabaseMikan {
  id: string
  name: string
  type: string
  data: [number, number]
}

export const MikanTotal = (): React.ReactElement => {
  const [mikansStatistics, setMikansStatistics] = useLocalStorage<
    DatabaseMikan[]
  >('mikansStatistics', [])

  const getAllMikanStatistics = async (): Promise<void> => {
    console.debug('getAllMikanStatistics')
    const mikanList: DatabaseMikan[] = []
    const mikans = query(
      collectionGroup(db, 'mikans'),
      where('type', '==', 'scatter')
    )
    try {
      const querySnapshot = await getDocs(mikans)
      console.debug(querySnapshot)
      querySnapshot.forEach((mikan) => {
        console.debug(mikan.id, ' : ', mikan.data())
        mikanList.push(mikan.data() as DatabaseMikan)
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    console.debug('useEffect')
    if (mikansStatistics.length === 0) {
      console.debug('there is no mikansStatistics in localStorage')
      void getAllMikanStatistics()
    } else {
      console.debug('there is mikansStatistics in localStorage')
      setOptions({
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
            src: getSrcImageList(),
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
            if (displayName !== data.id) {
              setDisplayName(data.id)
            }
            return data.name
          }
        },
        xaxis: {
          type: 'numeric',
          tickAmount: 10,
          min: -5,
          max: 5,
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
          axisTicks: {
            show: true,
            color: '#78909C',
            width: 4,
            offsetX: -0,
            offsetY: 0
          }
        }
      })
    }
  }, [mikansStatistics])

  const [displayName, setDisplayName] = useState<string>('')

  const getSrcImageList = (): string[] => {
    const srcImageList: string[] = []
    mikansStatistics.forEach((mikanStatistics: DatabaseMikan) => {
      srcImageList.push(
        `https://github.com/tofuchic/kancolle/raw/main/public/mikan/${mikanStatistics.id}.png`
      )
    })
    return srcImageList
  }

  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
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
        src: getSrcImageList(),
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
        if (displayName !== data.id) {
          setDisplayName(data.id)
        }
        return data.name
      }
    },
    xaxis: {
      type: 'numeric',
      tickAmount: 10,
      min: -5,
      max: 5,
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
      axisTicks: {
        show: true,
        color: '#78909C',
        width: 4,
        offsetX: -0,
        offsetY: 0
      }
    }
  })

  return (
    <>
      <TateWrapper>
        <IconButton aria-label="refresh" size="large">
          <RefreshIcon
            onClick={() => {
              void getAllMikanStatistics()
            }}
          />
        </IconButton>
        <YokoWrapper>
          <Column>とろとろ</Column>
        </YokoWrapper>
        <YokoWrapper>
          <Column>酸っぱい</Column>
          <Chart
            options={options}
            series={mikansStatistics}
            type="scatter"
            width={480}
            height={480}
          />
          <Column>甘い</Column>
        </YokoWrapper>
        <YokoWrapper>
          <Column>しゃきしゃき</Column>
        </YokoWrapper>

        <YokoWrapper>
          {displayName.length > 0 && (
            <div key={displayName}>
              <MikanDetail displayName={displayName} canUpdate={false} />
            </div>
          )}
        </YokoWrapper>
      </TateWrapper>
    </>
  )
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
