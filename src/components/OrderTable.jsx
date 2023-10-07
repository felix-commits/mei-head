import { useState } from 'react'
import {
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
  Skeleton,
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

const descendingComparator = (a, b, orderBy) => {
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

const Filters = () => (
  <>
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
  </>
)

export default function OrderTable({ scores }) {
  const [order, setOrder] = useState('desc')
  const [selected, setSelected] = useState([])
  const [open, setOpen] = useState(false)

  return (
    <Stack flex={1} justifyContent="space-between">
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: {
            xs: 'flex',
            sm: 'none',
          },
          flex: 1,
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
              <Filters />
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
        <Filters />
      </Stack>
      <Sheet
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          flex: 1,
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Skeleton loading={!scores.length}>
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
                      setSelected(event.target.checked ? scores.map(row => row.identifier) : [])
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
                .sort(getComparator(order, 'identifier'))
                .map(row => ({
                  ...row,
                  title: row.metas.find(e => e.propertyUri.includes('http://nakala.fr/terms#title'))?.value,
                  composer: row.metas.find(e => e.propertyUri.includes('http://purl.org/dc/terms/creator'))?.value,
                  created: row.metas.find(e => e.propertyUri.includes('http://nakala.fr/terms#created'))?.value,
                  creator: row.metas.find(e => e.propertyUri.includes('http://nakala.fr/terms#creator'))?.value,
                }))
                .map(row => (
                  <tr key={row.identifier}>
                    <td style={{ textAlign: 'center', width: 120 }}>
                      <Checkbox
                        size="sm"
                        checked={selected.includes(row.identifier)}
                        color={selected.includes(row.identifier) ? 'primary' : undefined}
                        onChange={event => {
                          setSelected(ids =>
                            event.target.checked
                              ? ids.concat(row.identifier)
                              : ids.filter(itemId => itemId !== row.identifier)
                          )
                        }}
                        slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                        sx={{ verticalAlign: 'text-bottom' }}
                      />
                    </td>
                    <td>
                      <Typography level="body-xs">{row.title}</Typography>
                    </td>
                    <td>
                      <Typography level="body-xs">{row.composer}</Typography>
                    </td>
                    <td>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Chip
                          variant="soft"
                          size="sm"
                          startDecorator={
                            {
                              published: <CheckRounded />,
                              pending: <AutorenewRounded />,
                            }[row.status]
                          }
                          color={
                            {
                              published: 'success',
                              pending: 'neutral',
                            }[row.status]
                          }
                        >
                          {row.status}
                        </Chip>
                        <Typography level="body-xs">{row.created}</Typography>
                      </Stack>
                    </td>
                    <td>
                      <Stack>
                        <Typography level="body-xs">
                          {row.creator.givenname} {row.creator.surname}
                        </Typography>
                        <Typography level="body-xs">{row.creator.orcid?.split('https://orcid.org/')}</Typography>
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
        </Skeleton>
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
    </Stack>
  )
}
