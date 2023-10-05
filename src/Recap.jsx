import { FormControl, FormLabel, Input, Modal, ModalClose, Sheet, Tooltip, Typography } from '@mui/joy'
import { useState } from 'react'

export const Recap = ({ composer, work, open, setOpen }) => {
  const [isComposerCopied, setIsComposerCopied] = useState(false)
  const [isWorkCopied, setIsWorkCopied] = useState(false)

  if (composer && work)
    return (
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography component="h2" level="h4" textColor="inherit" fontWeight="lg" mb={1}>
            This is your <code>{'<MeiHead/>'}</code>
          </Typography>
          <FormControl sx={{ paddingY: 2 }}>
            <FormLabel>
              Identifiant du compositeur <b>{composer.label}</b>
            </FormLabel>
            <Tooltip arrow title={isComposerCopied ? 'Copied to clipboard !' : 'Copy to clipboard'}>
              <Input
                readOnly
                onClick={() =>
                  setIsComposerCopied(true) && navigator.clipboard.writeText(composer.composer.split('#about').shift())
                }
                value={composer.composer.split('#about').shift()}
              ></Input>
            </Tooltip>
          </FormControl>

          <FormControl>
            <FormLabel>
              Identifiant de l'œuvre <b>{work.label}</b>
            </FormLabel>
            <Tooltip arrow title={isWorkCopied ? 'Copied to clipboard !' : 'Copy to clipboard'}>
              <Input
                readOnly
                onClick={() =>
                  setIsWorkCopied(true) && navigator.clipboard.writeText(work.work.split('#about').shift())
                }
                value={work.work.split('#about').shift()}
              ></Input>
            </Tooltip>
          </FormControl>
        </Sheet>
      </Modal>
    )
}
