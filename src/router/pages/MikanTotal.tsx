import { useEffect, useState } from 'react'
import { Box, Container, Grid } from '@mui/material'
import '@/styles/App.css'
import Chart from 'react-apexcharts'
import { MikanDetail } from './MikanDetail'
import { collectionGroup, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/services/auth/firebase'
import { ReactComponent as AmaiLogo } from '@/assets/amai.svg'
import { ReactComponent as SuppaiLogo } from '@/assets/suppai.svg'
import { ReactComponent as TorotoroLogo } from '@/assets/torotoro.svg'
import { ReactComponent as ShakishakiLogo } from '@/assets/shakishaki.svg'
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
    setMikansStatistics(mikanList)
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
            enabled: true,
          },
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
          redrawOnParentResize: true,
        },
        fill: {
          type: 'image',
          opacity: 0.8,
          image: {
            src: getSrcImageList(),
            width: 20,
            height: 20,
          },
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        legend: {
          show: false,
        },
        markers: {
          size: 10,
        },
        tooltip: {
          theme: 'dark',
          custom: ({ seriesIndex, w }: any) => {
            const data = w.globals.initialSeries[seriesIndex]
            if (displayName !== data.id) {
              setDisplayName(data.id)
            }
            return data.name
          },
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
            offsetY: 0,
          },
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
            offsetY: 0,
          },
        },
      })
    }
    setLoading(false)
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

  const [loading, setLoading] = useState<boolean>(false)

  const [options, setOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      height: 480,
      type: 'scatter',
      animations: {
        enabled: true,
      },
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      redrawOnParentResize: true,
    },
    fill: {
      type: 'image',
      opacity: 0.8,
      image: {
        src: getSrcImageList(),
        width: 20,
        height: 20,
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    legend: {
      show: false,
    },
    markers: {
      size: 10,
    },
    tooltip: {
      theme: 'dark',
      custom: ({ seriesIndex, w }: any) => {
        const data = w.globals.initialSeries[seriesIndex]
        if (displayName !== data.id) {
          setDisplayName(data.id)
        }
        return data.name
      },
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
        offsetY: 0,
      },
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
        offsetY: 0,
      },
    },
  })

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={3}>
        <Grid item md={12} lg={8}>
          <h1>みんなの評価</h1>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <IconButton
                aria-label="refresh"
                size="large"
                onClick={() => {
                  setLoading(true)
                  void getAllMikanStatistics()
                }}
              >
                <RefreshIcon
                  sx={
                    loading
                      ? { animation: 'spin 1s linear infinite' }
                      : undefined
                  }
                />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container alignItems={'center'} justifyContent={'center'}>
            <Grid item xs={1} md={2} sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'end',
                }}
              >
                <TorotoroLogo />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={1} md={2}>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <SuppaiLogo />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={10}
                  md={8}
                  sx={{ height: '600px', width: '720px' }}
                >
                  <Chart
                    options={options}
                    series={mikansStatistics}
                    type="scatter"
                    width={'100%'}
                    height={'100%'}
                  />
                </Grid>
                <Grid item xs={1} md={2}>
                  <Box
                    sx={{
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <AmaiLogo />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} md={2}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '16px',
                }}
              >
                <ShakishakiLogo />
              </Box>
            </Grid>
          </Grid>
        </Grid>
        {displayName.length > 0 && (
          <Grid item xs={12} md={6} lg={4} key={displayName}>
            <MikanDetail displayName={displayName} canUpdate={false} />
          </Grid>
        )}
      </Grid>
    </Container>
  )
}
