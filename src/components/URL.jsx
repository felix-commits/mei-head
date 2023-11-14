import { Add, ChevronRightRounded, HomeRounded } from '@mui/icons-material'
import { Breadcrumbs, Button, Stack, Typography, Link } from '@mui/joy'
import OrderTable from './OrderTable'
import OrderList from './OrderList'
import { useState } from 'react'

export const URL = () => {
  const [urls, setUrls] = useState([])

  return (
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
            Content
          </Link>
          <Typography color="primary" fontWeight={500} fontSize={12}>
            Urls
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
        <Typography level="h2">Personal URLs</Typography>
        <Button component="label" color="primary" startDecorator={<Add />} size="sm">
          Add new URL
        </Button>
      </Stack>
    </Stack>
  )
}
