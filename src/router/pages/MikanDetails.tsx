import { MikanDetail } from './MikanDetail'
import { useLocation } from 'react-router-dom'
import { Container, Grid } from '@mui/material'
import queryString from 'query-string'

export const MikanDetails = (): React.ReactElement => {
  const query = useLocation().search
  const parsedQuery = queryString.parse(query, { arrayFormat: 'comma' })

  console.debug('parsedQuery: ' + String(parsedQuery.displayName))

  const displayNames = parsedQuery.displayName

  const MikanDetailList = (): React.ReactElement => {
    if (displayNames == null) {
      return <div>表示するみかんがありません</div>
    } else if (typeof displayNames === 'string') {
      return (
        <Grid item xs={12} md={6}>
          <MikanDetail displayName={displayNames} canUpdate={true} />
        </Grid>
      )
    } else {
      const list = displayNames.map((displayName, index) => {
        return (
          <Grid item xs={12} md={6} key={index}>
            <MikanDetail displayName={displayName as string} canUpdate={true} />
          </Grid>
        )
      })
      return <>{list}</>
    }
  }

  return (
    <Container>
      <Grid container spacing={0.5}>
        <MikanDetailList></MikanDetailList>
      </Grid>
    </Container>
  )
}
