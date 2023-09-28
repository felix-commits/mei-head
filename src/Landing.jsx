import { ChevronRight, GitHub, Language, LibraryMusic, RoomService, SwapHoriz, TextSnippet } from '@mui/icons-material'
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  ListItemDecorator,
  ListSubheader,
  Tooltip,
  Typography,
} from '@mui/joy'
import { grey } from '@mui/material/colors'
import { Stack } from '@mui/system'
import { useEffect, useState } from 'react'

const KEY = window.btoa('fepoulpa:lq9_P9r0nP7')
const user = { id: 'user_2M3990Ap5NCaHEtTxKpm7WRcFOy' }
export const Landing = () => {
  const [selectedScoreIndex, setSelectedScoreIndex] = useState(false)

  const fetchArticles = async () => {
    console.log('yo')
    try {
      const request = await fetch(
        'https://data.fepoulpa.net/jsonapi/node/vendeur?filter[field_identifiant_clerk]' + user.id,
        { headers: { Authorization: 'Basic ' + KEY } }
      )
      const response = await request.json()
      console.log(request)
      setArticles(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchArticles()
  }, [])

  return (
    <Stack flex={1} justifyContent="space-between">
      <Stack flex={1} borderRadius={10} margin={2} minHeight={0} color="neutral">
        <Stack direction="row" minHeight={0}>
          <Stack flex={2}>
            <Stack direction="row" spacing={0.5} p={2}>
              <Typography variant="h5">Tonalities</Typography>
              <Typography fontSize={12} variant="h6">
                2.0
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" flex={3}>
            <Divider orientation="vertical" />
            <Stack flex={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" pr={0.5}>
                <ListSubheader>Available scores</ListSubheader>
                <Stack>
                  <IconButton disabled>
                    <SwapHoriz />
                  </IconButton>
                </Stack>
              </Stack>
              <List sx={{ overflow: 'auto' }}>
                <ListItem>
                  <ListItemButton
                    selected={selectedScoreIndex}
                    onClick={() => setSelectedScoreIndex(!selectedScoreIndex)}
                  >
                    <ListItemDecorator>
                      <LibraryMusic />
                    </ListItemDecorator>
                    <ListItemContent primary="All scores" secondary="View all analytical projects" />
                  </ListItemButton>
                </ListItem>
              </List>
            </Stack>
            <Divider orientation="vertical" />
            <Stack flex={1} minWidth={0}>
              {selectedScoreIndex ? (
                <List sx={{ overflow: 'auto' }}>
                  {[0, 1, 2, 3, 4].map(project => (
                    <ListItem key={project}>
                      <ListItemButton>
                        <ListItemDecorator>
                          <TextSnippet />
                        </ListItemDecorator>
                        <ListItemContent primary={'Project n°' + project} secondary="Félix Poullet-Pagès" />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Stack flex={1} justifyContent="center" alignItems="center" p={2}>
                  <Typography textAlign="center" color="text.secondary" fontSize={14}>
                    No score selected, start by selecting a score to browse analytical projects
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack alignSelf="end" direction="row" padding={2} spacing={1}>
        <Tooltip title="Polifonia website">
          <IconButton href="https://polifonia-project.eu/pilots/tonalities/">
            <Language />
          </IconButton>
        </Tooltip>
        <Tooltip title="Source code">
          <IconButton href="https://github.com/sherlock-iremus/sherlock-tonalities">
            <GitHub />
          </IconButton>
        </Tooltip>
        <Tooltip title="Report a bug">
          <IconButton href="https://github.com/sherlock-iremus/sherlock-tonalities/issues/new">
            <RoomService />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  )
}
