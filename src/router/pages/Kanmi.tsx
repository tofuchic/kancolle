import '@/services/auth/firebase'
import { kanmi } from '@/constants/kanmi'
import { Box, Grid, Typography } from '@mui/material'
import { Link as MuiLink } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { Link } from 'react-router-dom'

const KanmiList = (): React.ReactElement => {
  const kanmiList = kanmi.map((monthlyKanmi, index) => {
    return (
      <Grid item xs={12} md={10} lg={8} xl={6} key={index}>
        <Grid container sx={{ p: 1 }}>
          <Typography sx={{ my: 3 }} variant={'h2'} fontSize="1.5em">
            <Link to={'/mikan?displayName=' + monthlyKanmi.mikanList}>
              {monthlyKanmi.year}年{monthlyKanmi.month}月配送
            </Link>
          </Typography>{' '}
        </Grid>
        <Grid container>
          <Grid item xs={12} key={index}>
            <img
              className="image-mikan"
              src={monthlyKanmi.imgURL}
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    )
  })
  return <>{kanmiList}</>
}

export const Kanmi = (): React.ReactElement => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography sx={{ my: 3 }} variant={'h1'} fontSize="2em">
        <MuiLink
          href={'https://shop.kanmi.co.jp/'}
          underline="hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          柑橘サブスクリプション「かんみ」<OpenInNewIcon></OpenInNewIcon>
        </MuiLink>
        のみかん
      </Typography>{' '}
      <Grid container justifyContent={'center'}>
        <KanmiList></KanmiList>
      </Grid>
    </Box>
  )
}
