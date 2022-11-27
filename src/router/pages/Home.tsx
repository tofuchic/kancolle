import '@/services/auth/firebase'
import { kanmi } from '@/constants/kanmi'
import { Box, Grid, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const KanmiList = (): React.ReactElement => {
  const kanmiList = kanmi.map((monthlyKanmi, index) => {
    const mikanList = monthlyKanmi.mikanList.map((mikan, index) => {
      return (
        <Grid item xs={6} md={3} key={index}>
          <img
            className="image-mikan"
            // TODO: 清原から画像を使う許可を貰うなどしてもっと良い画像に差し替える
            src={`https://github.com/tofuchic/kancolle/raw/main/public/mikan/${mikan}.png`}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Grid>
      )
    })
    return (
      <Grid item xs={12} md={10} lg={8} xl={6} key={index}>
        <Grid container sx={{ p: 1 }}>
          <Typography sx={{ my: 3 }} variant={'h2'} fontSize="1.5em">
            <Link to={'/mikan?displayName=' + monthlyKanmi.mikanList}>
              {monthlyKanmi.year}年{monthlyKanmi.month}月配送
            </Link>
          </Typography>{' '}
        </Grid>
        <Grid container>{mikanList}</Grid>
      </Grid>
    )
  })
  return <>{kanmiList}</>
}

export const Home = (): React.ReactElement => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ my: 3 }} variant={'h1'} fontSize="2em">
        柑橘サブスクリプション「かんみ」のみかん
      </Typography>{' '}
      <Grid container justifyContent={'center'}>
        <KanmiList></KanmiList>
      </Grid>
    </Box>
  )
}
