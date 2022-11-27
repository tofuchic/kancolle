import { Alert, Box } from '@mui/material'

export const Home = (): React.ReactElement => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert sx={{ my: 3 }} severity="info">
        非公式サイトです。
      </Alert>
    </Box>
  )
}
