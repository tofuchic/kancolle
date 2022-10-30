import styled from '@emotion/styled'
import { MikanDetail } from './MikanDetail'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export const MikanDetails = (): JSX.Element => {
  const query = useLocation().search
  const parsedQuery = queryString.parse(query, { arrayFormat: 'comma' })

  console.debug('parsedQuery: ' + String(parsedQuery.displayName))

  const displayNames = parsedQuery.displayName

  const MikanDetailList = (): JSX.Element => {
    if (displayNames == null) {
      return <div>表示するみかんがありません</div>
    } else if (typeof displayNames === 'string') {
      return (
        <div>
          <MikanDetail displayName={displayNames} />
        </div>
      )
    } else {
      const list = displayNames.map((displayName) => {
        return (
          <div key={displayName}>
            <MikanDetail displayName={displayName} />
          </div>
        )
      })
      return <>{list}</>
    }
  }

  return (
    <div>
      <Wrapper>
        <MikanDetailList></MikanDetailList>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.section`
  display: flex;
  align-items: center;
`
