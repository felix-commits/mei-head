import { useColorScheme } from '@mui/joy/styles'
import Button from '@mui/joy/Button'

export const ModeToggle = () => {
  const { mode, setMode } = useColorScheme()

  return (
    <Button
      variant="soft"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      sx={{ position: 'absolute', right: 16, bottom: 16 }}
    >
      {mode === 'dark' ? 'Turn light' : 'Turn dark'}
    </Button>
  )
}
