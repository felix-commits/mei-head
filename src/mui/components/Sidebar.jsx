import PolifoniaLogo from '../../assets/polifonia.svg'
import ColorSchemeToggle from './ColorSchemeToggle'
import { closeSidebar } from '../utils'
import {
  BallotRounded,
  DashboardRounded,
  DescriptionRounded,
  GroupRounded,
  KeyboardArrowDown,
  LogoutRounded,
  SearchRounded,
  SettingsRounded,
  ShapeLineRounded,
  SupportRounded,
  ViewCarouselRounded,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Divider,
  GlobalStyles,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemContent,
  Sheet,
  Stack,
  Typography,
  listItemButtonClasses,
} from '@mui/joy'
import { Fragment, useState } from 'react'

function Toggler({ defaultExpanded = false, renderToggle, children }) {
  const [open, setOpen] = useState(defaultExpanded)
  return (
    <Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </Fragment>
  )
}

export default function Sidebar() {
  return (
    <Sheet
      className="Sidebar"
      sx={{
        position: {
          xs: 'fixed',
          md: 'sticky',
        },
        transform: {
          xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1)))',
          md: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        zIndex: 10000,
        height: '100dvh',
        width: 'var(--Sidebar-width)',
        top: 0,
        p: 2,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={theme => ({
          ':root': {
            '--Sidebar-width': '220px',
            [theme.breakpoints.up('lg')]: {
              '--Sidebar-width': '240px',
            },
          },
        })}
      />
      <Box
        className="Sidebar-overlay"
        sx={{
          position: 'fixed',
          zIndex: 9998,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          opacity: 'var(--SideNavigation-slideIn)',
          backgroundColor: 'var(--joy-palette-background-backdrop)',
          transition: 'opacity 0.4s',
          transform: {
            xs: 'translateX(calc(100% * (var(--SideNavigation-slideIn, 0) - 1) + var(--SideNavigation-slideIn, 0) * var(--Sidebar-width, 0px)))',
            lg: 'translateX(-100%)',
          },
        }}
        onClick={() => closeSidebar()}
      />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <img src={PolifoniaLogo} width="140px" />
        <ColorSchemeToggle sx={{ ml: 'auto' }} />
      </Box>
      <Input size="sm" startDecorator={<SearchRounded />} placeholder="Search" />
      <Stack minHeight={0} flexGrow={1} overflow="auto" sx={{ [`& .${listItemButtonClasses.root}`]: { gap: 1.5 } }}>
        <List
          size="sm"
          sx={{
            gap: 1,
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': theme => theme.vars.radius.sm,
          }}
        >
          <ListItem>
            <ListItemButton>
              <ViewCarouselRounded />
              <ListItemContent>
                <Typography level="title-sm">Sites</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton selected onClick={() => setOpen(!open)}>
                  <DescriptionRounded />
                  <ListItemContent>
                    <Typography level="title-sm">Content</Typography>
                  </ListItemContent>
                  <KeyboardArrowDown sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton>All</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Music scores</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Engravings</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Photographs</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Sound recordings</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <DashboardRounded />
              <ListItemContent>
                <Typography level="title-sm">Collections</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <BallotRounded />
              <ListItemContent>
                <Typography level="title-sm">Vocabularies</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton>
              <ShapeLineRounded />
              <ListItemContent>
                <Typography level="title-sm">Ressource templates</Typography>
              </ListItemContent>
            </ListItemButton>
          </ListItem>

          <ListItem nested>
            <Toggler
              renderToggle={({ open, setOpen }) => (
                <ListItemButton onClick={() => setOpen(!open)}>
                  <GroupRounded />
                  <ListItemContent>
                    <Typography level="title-sm">Users</Typography>
                  </ListItemContent>
                  <KeyboardArrowDown sx={{ transform: open ? 'rotate(180deg)' : 'none' }} />
                </ListItemButton>
              )}
            >
              <List sx={{ gap: 0.5 }}>
                <ListItem sx={{ mt: 0.5 }}>
                  <ListItemButton role="menuitem" component="a">
                    My profile
                  </ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Create a new user</ListItemButton>
                </ListItem>
                <ListItem>
                  <ListItemButton>Roles & permission</ListItemButton>
                </ListItem>
              </List>
            </Toggler>
          </ListItem>
        </List>

        <List size="sm" sx={{ flexGrow: 0, '--ListItem-radius': theme => theme.vars.radius.sm, '--List-gap': '8px' }}>
          <ListItem>
            <ListItemButton onClick={() => window.open('https://tonalities.gitpages.huma-num.fr/docs')}>
              <SupportRounded />
              Support
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton>
              <SettingsRounded />
              Settings
            </ListItemButton>
          </ListItem>
        </List>
      </Stack>

      <Divider />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Avatar variant="outlined" size="sm" src="https://i1.sndcdn.com/avatars-000331446673-kt5v5r-t500x500.jpg" />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography level="title-sm">Félix Poullet-Pagès</Typography>
          <Typography level="body-xs">felix.poullet-pages@cnrs.fr</Typography>
        </Box>
        <IconButton size="sm" variant="plain" color="neutral">
          <LogoutRounded />
        </IconButton>
      </Box>
    </Sheet>
  )
}
