import Sidebar from './components/Sidebar'
import OrderTable from './components/OrderTable'
import OrderList from './components/OrderList'
import Header from './components/Header'
import { Breadcrumbs, Button, CssBaseline, CssVarsProvider, Link, Sheet, Stack, Typography } from '@mui/joy'
import { Add, ChevronRightRounded, HomeRounded } from '@mui/icons-material'

export const App = () => (
  <CssVarsProvider>
    <CssBaseline />
    <Sheet sx={{ display: 'flex', flex: 1 }}>
      <Header />
      <Sidebar />
      <Stack
        flex={1}
        minWidth={0}
        height="100dvh"
        px={{ xs: 2, md: 6 }}
        pt={{ xs: 'calc(12px + var(--Header-height))', sm: 'calc(12px + var(--Header-height))', md: 3 }}
        pb={{ xs: 2, sm: 2, md: 3 }}
        gap={1}
      >
        <Stack>
          <Breadcrumbs size="sm" separator={<ChevronRightRounded />} sx={{ pl: 0 }}>
            <Link underline="none" color="neutral">
              <HomeRounded />
            </Link>
            <Link underline="hover" color="neutral" fontSize={12} fontWeight={500}>
              Collections
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              Music Scores
            </Typography>
          </Breadcrumbs>
        </Stack>
        <Stack
          my={1}
          gap={1}
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems={{ xs: 'start', sm: 'center' }}
          flexWrap="wrap"
          justifyContent="space-between"
        >
          <Typography level="h2">Music scores</Typography>
          <Button color="primary" startDecorator={<Add />} size="sm">
            Add new score
          </Button>
        </Stack>
        <OrderTable />
        <OrderList />
      </Stack>
    </Sheet>
  </CssVarsProvider>
)
