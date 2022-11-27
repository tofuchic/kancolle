import { Alert, Box, Link as MuiLink } from '@mui/material'

export const Home = (): React.ReactElement => {
  return (
    <Box sx={{ p: 2 }}>
      <Alert sx={{ my: 3 }} severity="info">
        非公式サイトです。何かあれば{' '}
        <MuiLink
          href="https://twitter.com/BlueTofuchic"
          underline="hover"
          target="_blank"
          rel="noopener noreferrer"
        >
          中の人
        </MuiLink>
        までご連絡お願いいたします。
      </Alert>
      <Alert sx={{ my: 3 }} severity="info">
        Twitter認証でログインした上で、メニューにある「かんみのみかん」から各月へのリンクに飛ぶと、みかんのレビューができます。
      </Alert>
    </Box>
  )
}
