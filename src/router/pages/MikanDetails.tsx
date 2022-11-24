import { MikanDetail } from './MikanDetail'
import { Link, useLocation } from 'react-router-dom'
import { Alert, Container, Grid, Typography } from '@mui/material'
import queryString from 'query-string'
import { auth } from '@/services/auth/firebase'

export const MikanDetails = (): React.ReactElement => {
  const query = useLocation().search
  const parsedQuery = queryString.parse(query, { arrayFormat: 'comma' })

  console.debug('parsedQuery: ' + String(parsedQuery.displayName))

  const displayNames = parsedQuery.displayName

  const MikanDetailList = (): React.ReactElement => {
    if (displayNames == null) {
      return (
        <Alert sx={{ my: 3 }} severity="info">
          表示するみかんがありません
        </Alert>
      )
    } else if (typeof displayNames === 'string') {
      return (
        <Grid item xs={12} md={6}>
          <MikanDetail
            displayName={displayNames}
            canUpdate={auth.currentUser != null}
          />
        </Grid>
      )
    } else {
      const list = displayNames.map((displayName, index) => {
        return (
          <Grid item xs={12} md={6} key={index}>
            <MikanDetail
              displayName={displayName as string}
              canUpdate={auth.currentUser != null}
            />
          </Grid>
        )
      })
      return <>{list}</>
    }
  }

  return (
    <Container>
      {auth.currentUser == null && (
        <Link to="/login">
          <Typography sx={{ my: 3 }} variant={'h2'} fontSize="1.5em">
            ログインしてみかんをレビューしよう
          </Typography>{' '}
        </Link>
      )}
      <Grid container spacing={0.5}>
        <MikanDetailList></MikanDetailList>
      </Grid>
    </Container>
  )
}
