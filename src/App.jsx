import { NewSource } from './NewSource'
import { CssBaseline, CssVarsProvider, Sheet } from '@mui/joy'

export const App = () => (
  <CssVarsProvider>
    <CssBaseline />
    <Sheet sx={{ display: 'flex', flex: 1 }}>
      <NewSource />
    </Sheet>
  </CssVarsProvider>
)
