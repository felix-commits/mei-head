import Autocomplete from '@mui/joy/Autocomplete'
import {
  Button,
  Chip,
  ChipDelete,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy'
import { useEffect, useState } from 'react'
import { UploadFileRounded } from '@mui/icons-material'

const queryComposers = input => `
PREFIX bnfroles: <http://data.bnf.fr/vocabulary/roles/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT DISTINCT ?label ?composer
WHERE {
  ?work bnfroles:r220 ?composer.
  ?composer a foaf:Person.
  ?composer foaf:name ?label
  FILTER (CONTAINS(LCASE(?label), "${input}"))
} LIMIT 10
`

const queryWorks = composer => `
PREFIX bnfroles: <http://data.bnf.fr/vocabulary/roles/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
SELECT DISTINCT ?work ?label
WHERE {
  ?expression ?o <${composer}>.
  ?work rdarelationships:expressionOfWork ?expression.
  ?work rdfs:label ?label .
}
`

export const NewSource = ({ upload, setUpload }) => {
  const [defaultComposer, setDefaultComposer] = useState('')
  const [inputComposer, setInputComposer] = useState('')
  const [composers, setComposers] = useState([])
  const [loadingComposers, setLoadingComposers] = useState(false)
  const [composer, setComposer] = useState('')

  const [defaultWork, setDefaultWork] = useState('')
  const [inputWork, setInputWork] = useState('')
  const [works, setWorks] = useState([])
  const [loadingWorks, setLoadingWorks] = useState(false)
  const [work, setWork] = useState('')

  const uploadScore = async () => {
    try {
      const body = new FormData()
      body.append('file', upload)
      await fetch(import.meta.env.DEV ? 'http://127.0.0.1:8788/upload' : 'https://mei-head.pages.dev/upload', {
        method: 'POST',
        body,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const fetchComposers = async () => {
    try {
      setLoadingComposers(true)
      const request = await fetch('https://data.bnf.fr/sparql', {
        method: 'POST',
        body: new URLSearchParams({ query: queryComposers(inputComposer) }),
        headers: { Accept: 'application/json' },
      })
      const response = await request.json()
      setComposers(response.results.bindings.map(e => ({ composer: e.composer.value, label: e.label.value })))
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingComposers(false)
    }
  }

  const fetchWorks = async () => {
    try {
      setLoadingWorks(true)
      const request = await fetch('https://data.bnf.fr/sparql', {
        method: 'POST',
        body: new URLSearchParams({ query: queryWorks(composer.composer) }),
        headers: { Accept: 'application/json' },
      })
      const response = await request.json()
      setWorks(
        response.results.bindings.map(e => ({ work: e.work.value, label: e.label.value.replace(/^\[|\]$/g, '') }))
      )
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingWorks(false)
    }
  }

  const scrapFile = async () => {
    const file = await upload.text()
    const mei = new DOMParser().parseFromString(file, 'application/xml')
    setDefaultComposer(mei.querySelector('[role="composer"]').textContent)
    setDefaultWork(mei.querySelector('title').textContent)
  }

  useEffect(() => {
    if (inputComposer.length >= 3) fetchComposers()
  }, [inputComposer])

  useEffect(() => {
    if (composer) fetchWorks()
  }, [composer])

  useEffect(() => {
    if (upload) scrapFile()
  }, [upload])

  return (
    <Modal
      open={!!upload}
      onClose={() => setUpload(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <DialogTitle component="h2" level="h4" fontWeight="lg" mb={1}>
          Add new score
        </DialogTitle>
        {upload && (
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>File</FormLabel>
              <Chip size="lg" variant="solid" endDecorator={<ChipDelete onDelete={() => setUpload(null)} />}>
                {upload.name.split('.mei')}
              </Chip>
            </FormControl>
            <FormControl>
              <FormLabel>Composer</FormLabel>
              <Autocomplete
                required
                value={composer}
                placeholder={defaultComposer}
                options={composers}
                inputValue={inputComposer}
                loading={loadingComposers}
                onInputChange={(e, input) => setInputComposer(input)}
                onChange={(e, value) => setComposer(value)}
                isOptionEqualToValue={(option, value) => option?.label === value?.label}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Music piece</FormLabel>
              <Autocomplete
                disabled={!composer}
                value={work}
                placeholder={defaultWork}
                required
                options={works}
                inputValue={inputWork}
                loading={loadingWorks}
                onInputChange={(e, input) => setInputWork(input)}
                onChange={(e, value) => setWork(value)}
                isOptionEqualToValue={(option, value) => option?.label === value?.label}
              />
            </FormControl>
          </Stack>
        )}
        <DialogActions>
          <Button onClick={uploadScore} variant="solid" size="lg" disabled={!composer || !work}>
            Confirm
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}
