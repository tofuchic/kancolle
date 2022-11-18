import '@/services/auth/firebase'
import styled from '@emotion/styled'
import { kanmi } from '@/constants/kanmi'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'

const KanmiList = (): React.ReactElement => {
  const kanmiList = kanmi.map((monthlyKanmi, index) => {
    const mikanList = monthlyKanmi.mikanList.map((mikan, index) => {
      return (
        <Grid item xs={6} md={3} key={index}>
          <img
            className="image-mikan"
            // TODO: 清原から画像使う許可を貰うか、届いた後に自分で写真を撮り、publicディレクトリ下に配置する
            // src={`https://github.com/tofuchic/kancolle/raw/main/public/mikan/${mikan}.png`}
            src={`https://github.com/tofuchic/kancolle/raw/main/public/mikan/fruit_orange.png`}
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
        <Grid container key={index} sx={{padding: "8px"}}>
          <h2>
            <Link to={'/mikan?displayName=' + monthlyKanmi.mikanList}>
              {monthlyKanmi.year}年{monthlyKanmi.month}月配送
            </Link>
          </h2>
        </Grid>
        <Grid container key={index}>
          {mikanList}
        </Grid>
      </Grid>
    )
  })
  return <>{kanmiList}</>
}

export const Home = (): React.ReactElement => {
  return (
    <div style={{ padding: '16px' }}>
      <h1>柑橘サブスクリプション「かんみ」のみかん</h1>
      <Grid container justifyContent={'center'}>
        <KanmiList></KanmiList>
      </Grid>
    </div>
  )
}
