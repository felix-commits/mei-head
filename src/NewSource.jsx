import Card from '@mui/joy/Card'
import Autocomplete from '@mui/joy/Autocomplete'
import { Stack, Typography } from '@mui/joy'
import { ModeToggle } from './ModeToggle'

export const NewSource = () => (
  <Stack flex={1} p={2} justifyContent="center" alignItems="center">
    <Card>
      <Typography>Yo la team</Typography>
      <Autocomplete options={['Option 1', 'Option 2']} />
    </Card>
    <ModeToggle />
  </Stack>
)
