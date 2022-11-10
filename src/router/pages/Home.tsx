import '@/services/auth/firebase'
import styled from '@emotion/styled'
import { kanmi } from '@/constants/kanmi'
import { Grid } from '@mui/material'

const KanmiList = (): React.ReactElement => {
  const kanmiList = kanmi.map((monthlyKanmi, index) => {
    const mikanList = monthlyKanmi.mikanList.map((mikan, index) => {
      return (
        <div key={index}>
          <img
            className="image-mikan"
            // TODO: 清原から画像使う許可を貰うか、届いた後に自分で写真を撮り、publicディレクトリ下に配置する
            // src={`https://github.com/tofuchic/kancolle/raw/main/public/mikan/${mikan}.png`}
            src={`https://github.com/tofuchic/kancolle/raw/main/public/mikan/fruit_orange.png`}
          />
        </div>
      )
    })
    return (
      <Grid item xs={12} md={6} key={index}>
        <h2>
          {monthlyKanmi.year}年{monthlyKanmi.month}月配送
        </h2>
        <YokoWrapper>{mikanList}</YokoWrapper>
      </Grid>
    )
  })
  return <>{kanmiList}</>
}

export const Home = (): React.ReactElement => {
  return (
    <div>
      <h1>柑橘サブスクリプション「かんみ」のみかん</h1>
      <KanmiList></KanmiList>
    </div>
  )
}

const YokoWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: left;
`
