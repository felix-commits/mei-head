import { Add, ChevronRightRounded, HomeRounded } from '@mui/icons-material'
import { Breadcrumbs, Button, Stack, Typography, Link, Card, CardOverflow, CardContent, Divider, Grid } from '@mui/joy'
import { useState } from 'react'
import xmljs from 'xml-js'

export const URL = () => {
  const [offers, setOffers] = useState([])
  
  const fetchOffers = async () => {
    try {
      const response = await fetch('https://emploi.cnrs.fr/Rss/Offres.ashx')
      const xml = await response.text()
      const json = xmljs.xml2json(xml, { compact: true, spaces: 2 })
      setOffers(JSON.parse(json).rss.channel.item.filter(o => o.category._text === 'CDD Doctorant/Contrat doctoral'))
    } catch (error) {
      console.error('Error parsing XML to JSON:', error)
    }
  }

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
        <Typography level="h2">Mon contrat doctoral</Typography>
        <Button onClick={fetchOffers} component="label" color="primary" startDecorator={<Add />} size="sm">
          Add new URL
        </Button>
      </Stack>
      <Grid container overflow="auto" spacing={1}>
        {offers.map((offer, index) => (
          <Grid item key={index}>
            <Card variant="outlined" sx={{ width: 320 }}>
              <CardContent>
                <Typography level="title-md">{offer.title._text}</Typography>
                <Typography level="body-sm">CNRS</Typography>
              </CardContent>
              <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                  <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                    Contrat doctoral
                  </Typography>
                  <Divider orientation="vertical" />
                  <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                    {new Date(offer.pubDate._text).toLocaleDateString()}
                  </Typography>
                  <Button onClick={() => window.open(offer.link._text)} variant="soft" size="sm">
                    Candidater
                  </Button>
                </CardContent>
              </CardOverflow>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}
