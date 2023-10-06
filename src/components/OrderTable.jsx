import { Fragment, useState } from 'react'
import scores from '../assets/scores.json'
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Divider,
  Dropdown,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  Modal,
  ModalClose,
  ModalDialog,
  Option,
  Select,
  Sheet,
  Stack,
  Table,
  Typography,
  iconButtonClasses,
} from '@mui/joy'
import {
  ArrowDropDown,
  AutorenewRounded,
  Block,
  CheckRounded,
  FilterAlt,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  MoreHorizRounded,
  Search,
} from '@mui/icons-material'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1
  if (b[orderBy] > a[orderBy]) return 1
  return 0
}

const getComparator = (order, orderBy) =>
  order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy)

const RowMenu = () => (
  <Dropdown>
    <MenuButton slots={{ root: IconButton }} slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}>
      <MoreHorizRounded />
    </MenuButton>
    <Menu size="sm" sx={{ minWidth: 140 }}>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Rename</MenuItem>
      <MenuItem>Move</MenuItem>
      <Divider />
      <MenuItem color="danger">Delete</MenuItem>
    </Menu>
  </Dropdown>
)

export default function OrderTable() {
  const [order, setOrder] = useState('desc')
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)

  const renderFilters = () => (
    <Fragment>
      <FormControl size="sm">
        <FormLabel>Status</FormLabel>
        <Select size="sm" placeholder="Filter by status" slotProps={{ button: { sx: { whiteSpace: 'nowrap' } } }}>
          <Option value="paid">Private</Option>
          <Option value="pending">Public</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Collection</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">Zarlino</Option>
          <Option value="refund">Praetorius</Option>
          <Option value="purchase">Josquin de Prez</Option>
        </Select>
      </FormControl>

      <FormControl size="sm">
        <FormLabel>Engraver</FormLabel>
        <Select size="sm" placeholder="All">
          <Option value="all">Marco Gurrieri</Option>
          <Option value="olivia">Christophe Guillotel</Option>
          <Option value="steve">Simon Raguet</Option>
        </Select>
      </FormControl>
    </Fragment>
  )

  return (
    <Fragment>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: {
            xs: 'flex',
            sm: 'none',
          },
          my: 1,
          gap: 1,
        }}
      >
        <Input size="sm" placeholder="Search" startDecorator={<Search />} sx={{ flexGrow: 1 }} />
        <IconButton size="sm" variant="outlined" color="neutral" onClick={() => setOpen(true)}>
          <FilterAlt />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Stack
        borderRadius="sm"
        direction="row"
        py={2}
        flexWrap="wrap"
        gap={1.5}
        sx={{ '& > *': { minWidth: { xs: '120px', md: '160px' } } }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for score</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<Search />} />
        </FormControl>
        {renderFilters()}
      </Stack>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={selected.length > 0 && selected.length !== scores.length}
                  checked={selected.length === scores.length}
                  onChange={event => {
                    setSelected(event.target.checked ? scores.map(row => row.scoreIri) : [])
                  }}
                  color={selected.length > 0 || selected.length === scores.length ? 'primary' : undefined}
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 120, padding: '12px 6px' }}>
                <Link
                  underline="none"
                  color="primary"
                  component="button"
                  onClick={() => setOrder(order === 'asc' ? 'desc' : 'asc')}
                  fontWeight="lg"
                  endDecorator={<ArrowDropDown />}
                  sx={{
                    '& svg': {
                      transition: '0.2s',
                      transform: order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                    },
                  }}
                >
                  Piece
                </Link>
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>Composer</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Status</th>
              <th style={{ width: 240, padding: '12px 6px' }}>Engraver</th>
              <th style={{ width: 140, padding: '12px 6px' }}> </th>
            </tr>
          </thead>
          <tbody>
            {scores
              .slice()
              .sort(getComparator(order, 'scoreIri'))
              .map(row => (
                <tr key={row.scoreIri}>
                  <td style={{ textAlign: 'center', width: 120 }}>
                    <Checkbox
                      size="sm"
                      checked={selected.includes(row.scoreIri)}
                      color={selected.includes(row.scoreIri) ? 'primary' : undefined}
                      onChange={event => {
                        setSelected(ids =>
                          event.target.checked
                            ? ids.concat(row.scoreIri)
                            : ids.filter(itemId => itemId !== row.scoreIri)
                        )
                      }}
                      slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                      sx={{ verticalAlign: 'text-bottom' }}
                    />
                  </td>
                  <td>
                    <Typography level="body-xs">{row.scoreTitle}</Typography>
                  </td>
                  <td>
                    <Typography level="body-xs">{row.scoreComposer}</Typography>
                  </td>
                  <td>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={
                        {
                          Paid: <CheckRounded />,
                          Refunded: <AutorenewRounded />,
                          Cancelled: <Block />,
                        }[row.status]
                      }
                      color={
                        {
                          Paid: 'success',
                          Refunded: 'neutral',
                          Cancelled: 'danger',
                        }[row.status]
                      }
                    >
                      {row.status}
                    </Chip>
                  </td>
                  <td>
                    <Stack direction="row" gap={1} alignItems="center">
                      <Avatar size="sm">FP</Avatar>
                      <Stack>
                        <Typography level="body-xs">Félix Poullet-Pagès</Typography>
                        <Typography level="body-xs">0000-0003-0740-7527</Typography>
                      </Stack>
                    </Stack>
                  </td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <Link level="body-xs" component="button">
                        Download
                      </Link>
                      <RowMenu />
                    </Box>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Sheet>
      <Stack direction="row" pt={2} gap={1} sx={{ [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' } }}>
        <Button size="sm" variant="outlined" color="neutral" startDecorator={<KeyboardArrowLeft />}>
          Previous
        </Button>

        <Stack flex={1} />
        {['1', '2', '3', '…', '8', '9', '10'].map(page => (
          <IconButton key={page} size="sm" variant={Number(page) ? 'outlined' : 'plain'} color="neutral">
            {page}
          </IconButton>
        ))}
        <Stack flex={1} />

        <Button size="sm" variant="outlined" color="neutral" endDecorator={<KeyboardArrowRight />}>
          Next
        </Button>
      </Stack>
    </Fragment>
  )
}
