import Autocomplete from '@mui/joy/Autocomplete'
import {
  Button,
  Chip,
  ChipDelete,
  DialogActions,
  DialogTitle,
  FormControl,
  FormLabel,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from '@mui/joy'
import { useEffect, useState } from 'react'
import { BASE_URL } from '../utils'

export const NewSource = ({ upload, setUpload, fetchScores }) => {
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      const body = new FormData()
      body.append('file', upload)
      body.append('work', work.work)
      body.append('workLabel', work.label)
      body.append('composer', composer.composer)
      body.append('composerLabel', composer.label)
      const response = await fetch(BASE_URL + 'upload', {
        method: 'POST',
        body,
      })
      fetchScores()
      setUpload(null)
      return await response.json()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchComposers = async () => {
    try {
      setLoadingComposers(true)
      const request = await fetch(
        `https://data.bnf.fr/fr/api/index-author/All/page1?role=220&searchletters=${inputComposer}`
      )
      const response = await request.json()
      setComposers(response.documents.map(e => ({ composer: e.eid, label: e.title })))
    } catch (error) {
      console.error(error)
    } finally {
      setLoadingComposers(false)
    }
  }

  const fetchWorks = async () => {
    try {
      setLoadingWorks(true)
      const request = await fetch(`https://data.bnf.fr/fr/api/${composer.composer}/activities/tum`)
      const response = await request.json()
      setWorks(
        response.documents.map(e => ({ work: e.eid, label: e.title.replace(/^\[|\]$/g, '') }))
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
      onClose={() => setUpload(null)}
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
          <Button onClick={uploadScore} loading={loading} variant="solid" size="lg" disabled={!composer || !work}>
            Confirm
          </Button>
        </DialogActions>
      </ModalDialog>
    </Modal>
  )
}
