import { Stack } from '@mui/system'
import { Intro } from './Intro'

export const App = () => (
  <Stack
    flex={1}
    justifyContent="space-between"
    p={2}
    sx={{ background: 'linear-gradient(to right bottom, #FF0000)' }}
  >
    <Stack alignSelf="center">
      <Intro />
    </Stack>
  </Stack>
)
