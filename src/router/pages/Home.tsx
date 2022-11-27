import { Alert, Box } from '@mui/material'

export const Home = (): React.ReactElement => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert sx={{ my: 3 }} severity="info">
        表示するみかんがありません
      </Alert>
    </Box>
  )
}
