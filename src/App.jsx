import { Sidebar } from './components/Sidebar'
import Header from './components/Header'
import { CssBaseline, CssVarsProvider, Sheet } from '@mui/joy'
import { useState } from 'react'
import { Main } from './components/Main'

export const App = () => {
  const [selectedTab, setSelectedTab] = useState(0)

  return (
    <CssVarsProvider>
      <CssBaseline />
      <Sheet sx={{ display: 'flex', flex: 1 }}>
        <Header />
        <Sidebar {...{ selectedTab, setSelectedTab }} />
        <Main {...{ selectedTab }} />
      </Sheet>
    </CssVarsProvider>
  )
}
